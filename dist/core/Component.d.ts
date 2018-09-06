interface IObj {
    [index: string]: any;
}
interface IComponentsHash {
    [name: string]: Base | Base[];
}
export default class Base<P extends IObj = {}, S extends IObj = {}> {
    ref: HTMLElement;
    parent: Base | null;
    renderOption: IObj;
    state: Readonly<S>;
    props: P;
    lastRenderSnapshot: string;
    lastComponentsSnapshot: IComponentsHash;
    mounted: boolean;
    constructor(option?: {
        el?: string;
        props?: () => P;
    });
    init(): this;
    components(): IComponentsHash;
    didMount(): void;
    didUpdate(): void;
    willUnMount(): void;
    shouldUpdate(): boolean | void;
    render(): string;
    setState<K extends keyof S>(state: Pick<S, K>): void;
    private propsFunc;
    private updateSelf;
    private update;
    private updateChildren;
    private hasChildren;
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
