interface IObj {
  [index: string]: any;
}
declare type Prop<P> = (() => P) | P;
interface IProp<P> {
  props?: Prop<P>;
}
declare type FnComponent = () => string;
export interface IComponentsRawHash {
  [name: string]: Component | FnComponent | Array<Component | FnComponent>;
}
interface IComponentsHash {
  [name: string]: Component | Component[];
}
interface IComponentOption<P> extends IProp<P> {
  el?: string;
  fnComponent?: FnComponent;
}
export default class Component<P extends IObj = {}, S extends IObj = {}> {
  public ref: HTMLElement;
  public parent: Component<any, any> | null;
  public renderOption: IComponentOption<P>;
  public state: Readonly<S>;
  public props: P;
  public lastRenderSnapshot: string;
  public lastComponentsSnapshot: IComponentsHash;
  public mounted: boolean;
  private preRenderResult;
  private propsFunc;
  private updateSelf;
  private update;
  private updateChildren;
  private hasChildren;
  private safeComponents;
  private initChild;
  private preRenderForFunction;
  private replaceSlotWithChild;
  private shouldUpdateSelf;
  private initProps;
  private updateChain;
  private register;
  private mount;
  private patch;
  constructor(option?: IComponentOption<P>);
  public init(): this;
  public components(): IComponentsRawHash;
  public didMount(): void;
  public didUpdate(): void;
  public willUnMount(): void;
  public shouldUpdate(): boolean | void;
  public render(props?: P, state?: Readonly<S>): string;
  public setState<K extends keyof S>(
    state: Pick<S, K> | ((prevState: S) => S)
  ): void;
}
export {};
