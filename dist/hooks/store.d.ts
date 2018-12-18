import Component from "../core/Component";
interface IStore {
    activeComponent: Component<any, any> | null;
    componentArray: Component[];
    stateList: any[];
    effectList: any[];
    makeState: () => {
        [index: number]: any;
    };
}
export declare const store: IStore;
export {};
