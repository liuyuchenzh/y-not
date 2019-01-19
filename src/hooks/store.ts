import Component, { IComponentsRawHash } from "../core/Component";

interface IStore {
  activeComponent: Component<any, any> | null;
  componentArray: Component[];
  stateList: any[];
  effectList: any[];
  components: () => IComponentsRawHash;
  makeState: () => { [index: number]: any };
  clear: () => void;
}

export const store: IStore = {
  activeComponent: null,
  componentArray: [],
  stateList: [],
  effectList: [],
  components: () => ({}),
  makeState() {
    return store.stateList.reduce((last, item: any, index: number) => {
      return {
        ...last,
        [index]: item
      };
    }, {});
  },
  clear() {
    store.stateList = [];
    store.effectList = [];
    store.components = () => ({});
  }
};
