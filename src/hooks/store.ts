import Component from "../core/Component";

interface IStore {
  activeComponent: Component | null;
  componentArray: Component[];
  stateList: any[];
  effectList: any[];
  makeState: () => { [index: number]: any };
}

export const store: IStore = {
  activeComponent: null,
  componentArray: [],
  stateList: [],
  effectList: [],
  makeState() {
    return store.stateList.reduce((last, item, index) => {
      return {
        ...last,
        [index]: item
      };
    }, {});
  }
};
