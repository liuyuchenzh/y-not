interface IObj {
    [index: string]: any;
}
declare type Prop<P> = (() => P) | P;
interface IProp<P> {
    props?: Prop<P>;
}
declare type FnComponent = () => string;
interface IComponentsRawHash {
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
    ref: HTMLElement;
    parent: Component<any, any> | null;
    renderOption: IComponentOption<P>;
    state: Readonly<S>;
    props: P;
    lastRenderSnapshot: string;
    lastComponentsSnapshot: IComponentsHash;
    mounted: boolean;
    constructor(option?: IComponentOption<P>);
    init(): this;
    components(): IComponentsRawHash;
    didMount(): void;
    didUpdate(): void;
    willUnMount(): void;
    shouldUpdate(): boolean | void;
    render(props?: P, state?: Readonly<S>): string;
    setState<K extends keyof S>(state: Pick<S, K> | ((prevState: S) => S)): void;
    private propsFunc;
    private updateSelf;
    private update;
    private updateChildren;
    private hasChildren;
    private safeComponents;
    private initChild;
    private replaceSlotWithChild;
    private shouldUpdateSelf;
    private initProps;
    private updateChain;
    private register;
    private mount;
    private patch;
}
export {};
