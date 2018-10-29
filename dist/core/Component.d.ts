interface IObj {
    [index: string]: any;
}
declare type Prop<P> = (() => P) | P;
interface IProp<P> {
    props?: Prop<P>;
}
declare type FnComponent = () => string;
interface IComponentsRawHash {
    [name: string]: Base | FnComponent | Array<Base | FnComponent>;
}
interface IComponentsHash {
    [name: string]: Base | Base[];
}
interface IComponentOption<P> extends IProp<P> {
    el?: string;
    fnComponent?: FnComponent;
}
export default class Base<P extends IObj = {}, S extends IObj = {}> {
    ref: HTMLElement;
    parent: Base | null;
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
    setState<K extends keyof S>(state: Pick<S, K>): void;
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
