import Component, { IComponentsRawHash } from "../core/Component";
interface IStore {
  activeComponent: Component<any, any> | null;
  componentArray: Component[];
  stateList: any[];
  effectList: any[];
  components: () => IComponentsRawHash;
  makeState: () => {
    [index: number]: any;
  };
  clear: () => void;
}
export declare const store: IStore;
export {};
