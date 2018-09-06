import DiffDOM from "diff-dom";
import compareArray, { IDiff } from "../util/compareArray";
import domParser from "../util/domParser";
import replaceDom from "../util/replaceDom";
import insertBefore from "../util/insertBefore";
import insertAfter from "../util/insertAfter";
import removeDom from "../util/removeDom";
import filterObj from "../util/filterObject";
const config = {
  logDiff: false
};
const dd = new DiffDOM({
  preVirtualDiffApply(info: any) {
    if (!config.logDiff) {
      return;
    }
    console.log(info);
  },
  preDiffApply(info: { diff: { action: string } }) {
    if (info.diff.action === "modifyValue") {
      return true;
    }
  }
});

// filter out Component
const filterOutInstance = filterObj(([_, v]) => {
  const isInstance: boolean = (v as any) instanceof Base;
  return !isInstance;
});

interface IObj {
  [index: string]: any;
}

interface IComponentsHash {
  [name: string]: Base | Base[];
}

export default class Base<P extends IObj = {}, S extends IObj = {}> {
  public ref!: HTMLElement;
  public parent: Base | null = null;
  public renderOption: IObj = {};
  public state!: Readonly<S>;
  public props: P = {} as P;
  public lastRenderSnapshot: string = "";
  public lastComponentsSnapshot: IComponentsHash = {};
  public mounted: boolean = false;
  constructor(
    option: {
      el?: string;
      props?: () => P;
    } = {}
  ) {
    // cache option
    this.renderOption = option;
    this.initProps(option.props);
  }

  // constructor -> render -> didMount
  public init() {
    // cache result
    this.lastComponentsSnapshot = this.components();
    // update DOM
    this.update();
    // cache render
    this.lastRenderSnapshot = this.render();
    return this;
  }

  public components(): IComponentsHash {
    return {};
  }

  public didMount(): void {
    return;
  }

  public didUpdate(): void {
    return;
  }

  public willUnMount(): void {
    return;
  }

  public shouldUpdate(): boolean | void {
    return;
  }

  public render(): string {
    return "<div/>";
  }

  // update state
  public setState<K extends keyof S>(state: Pick<S, K>) {
    if (!state) {
      throw new Error("You need to pass in a valid props object");
    }
    const { newState, hasChanged } = Object.entries(state).reduce(
      (
        last: {
          newState: Pick<S, K>;
          hasChanged: boolean;
        },
        [key, value]: [string, any]
      ) => {
        const hasKey = key in this.state;
        // discard if didn't exist
        if (!hasKey) {
          return last;
        }
        const changed: boolean = value !== this.state[key];
        return {
          newState: Object.assign(last.newState, { [key]: value }),
          hasChanged: last.hasChanged || changed
        };
      },
      {
        hasChanged: false,
        newState: this.state
      }
    );
    if (hasChanged) {
      this.state = newState as S;
      this.update();
    }
  }

  // props
  private propsFunc: () => P = () => ({} as P);

  private updateSelf() {
    if (!this.shouldUpdateSelf()) {
      return;
    }
    const { el } = this.renderOption;
    const lastRef: HTMLElement = this.ref;
    const html: string = this.render();
    // update render cache
    this.lastRenderSnapshot = html;
    // early exit if no result
    if (!html || !html.trim()) {
      return;
    }
    const element: HTMLElement = domParser(html);
    if (!lastRef) {
      // bind ref
      this.ref = element;
    } else {
      if (this.hasChildren()) {
        // update children first
        // todo: better solution
        this.replaceSlotWithChild(this.lastComponentsSnapshot, element, false);
      }
      this.patch(element);
      return;
    }
    // only mount root component here
    const isRoot: boolean = !!el && typeof el === "string";
    if (!isRoot) {
      return;
    }
    document.querySelector(el).append(this.ref);
    // mount
    if (!this.mounted) {
      this.mount();
    }
  }

  // update component
  private update() {
    this.props = this.propsFunc();
    this.updateChildren();
    this.updateSelf();
  }

  private updateChildren() {
    const hash: IComponentsHash = this.components();
    // no children, early exit
    if (!this.hasChildren(hash)) {
      return;
    }
    // get last cache
    const oldHash: IComponentsHash = this.lastComponentsSnapshot;
    Object.entries(hash).forEach(([name, component]) => {
      const oldComponent = oldHash[name];
      // array
      if (Array.isArray(component) && Array.isArray(oldComponent)) {
        // init
        component.forEach(c => this.initChild(c));
        const oldLen: number = oldComponent.length;
        const len: number = component.length;
        // compare props to decide how to update children
        const oldProps: object[] = oldComponent
          .map(c => c.props)
          .map(filterOutInstance);
        const newProps: object[] = component
          .map(c => c.props)
          .map(filterOutInstance);
        const arrayDiff = compareArray(oldProps, newProps);
        // get update/add/delete array
        const { update, add, del } = arrayDiff.reduce(
          (last: { update: IDiff[]; del: IDiff[]; add: IDiff[] }, item) => {
            if (item.type === "E") {
              last.update.push(item);
            }
            if (item.type === "D") {
              last.del.push(item);
            }
            if (item.type === "A") {
              last.add.push(item);
            }
            return last;
          },
          {
            update: [],
            add: [],
            del: []
          }
        );
        // update has first class priority
        update.forEach(item => {
          const { index } = item;
          const c: Base = component[index];
          const oldC: Base = oldComponent[index];
          oldC.propsFunc = c.propsFunc;
          oldC.update();
        });
        // deal with add
        if (add.length && add.length === len + oldLen) {
          // 0 -> n
          const target: HTMLElement | null = this.ref.querySelector(name);
          if (target) {
            replaceDom(target, component.map(c => c.ref));
          }
          component.forEach(c => c.mount());
          this.lastComponentsSnapshot[name] = component;
        } else {
          const oldEl: HTMLElement[] = oldComponent.map(c => c.ref);
          add.forEach((item, i) => {
            const { index } = item;
            const newC: Base = component[index];
            // add to middle
            if (index < oldLen) {
              insertBefore(oldEl[index], newC.ref);
              (this.lastComponentsSnapshot[name] as Base[]).splice(
                index + i,
                0,
                newC
              );
            } else {
              // append
              const ref: HTMLElement =
                index === oldLen
                  ? oldComponent[oldLen - 1].ref
                  : component[index - 1].ref;
              insertAfter(ref, newC.ref);
              (this.lastComponentsSnapshot[name] as Base[])[index] = newC;
            }
            // mount
            newC.mount();
          });
        }
        // n -> 0 ?
        const isEmpty: boolean = del.length === oldLen;
        // deal with delete
        del.forEach((item, i) => {
          const { index } = item;
          const oldC: Base = oldComponent[index];
          (this.lastComponentsSnapshot[name] as Base[]).splice(index - i, 1);
          oldC.willUnMount();
          if (isEmpty && index === oldLen - 1) {
            return replaceDom(oldC.ref, domParser(name));
          }
          removeDom(oldC.ref);
        });
      } else if (!Array.isArray(component) && !Array.isArray(oldComponent)) {
        // update single component
        oldComponent.update();
      }
    });
  }

  private hasChildren(
    hash: IComponentsHash = this.lastComponentsSnapshot
  ): boolean {
    return Object.keys(hash).length > 0;
  }

  // assign parent
  private initChild(child: Base) {
    child.parent = this;
  }

  // replace custom element with real element
  private replaceSlotWithChild(
    components: IComponentsHash,
    ref: HTMLElement = this.ref,
    isRegister: boolean = true
  ) {
    // not register phase
    // using existing outerHTML to replace
    Object.entries(components).forEach(([name, child]) => {
      let replaceElement: HTMLElement[] | HTMLElement | null = null;
      if (Array.isArray(child)) {
        // only assign if has children
        if (child.length) {
          child.forEach(c => this.initChild(c));
          replaceElement = child.map(c => {
            return isRegister ? c.ref : domParser(c.ref.outerHTML);
          });
        }
      } else {
        this.initChild(child);
        // could be no ref if render returns "" or null or undefined
        if (child.ref) {
          replaceElement = isRegister
            ? child.ref
            : domParser(child.ref.outerHTML);
        }
      }
      // if have elements, then replace
      // or leave it be
      if (replaceElement) {
        const target: HTMLElement | null = this.ref.querySelector(name);
        if (target) {
          replaceDom(target, replaceElement);
        }
      }
      // don't trigger mount if it is not register phase
      if (!isRegister) {
        return;
      }
      // mount
      if (Array.isArray(child)) {
        child.forEach(c => {
          if (c.ref) {
            c.mount();
          }
        });
      } else {
        if (child.ref) {
          child.mount();
        }
      }
    });
  }

  private shouldUpdateSelf(): boolean {
    // override
    const manualResult: boolean | void = this.shouldUpdate();
    if (typeof manualResult === "boolean") {
      return manualResult;
    }
    const renderResult: string = this.render();
    return renderResult !== this.lastRenderSnapshot;
  }

  private initProps(props?: () => P) {
    if (!props) {
      return;
    }
    if (props && typeof props === "function") {
      this.propsFunc = props;
      this.props = props();
    } else {
      console.log("props should be function!");
    }
  }

  private updateChain(): void {
    this.didUpdate();
    if (this.parent && this.parent instanceof Base) {
      this.parent.updateChain();
    }
  }

  // register children
  private register(): void {
    // replace
    this.replaceSlotWithChild(this.lastComponentsSnapshot);
  }

  private mount(): void {
    this.register();
    this.didMount();
    this.mounted = true;
  }

  private patch(el: HTMLElement): void {
    const diffResult: any = dd.diff(this.ref, el);
    dd.apply(this.ref, diffResult);
    // chain effect
    this.updateChain();
  }
}
