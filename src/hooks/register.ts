import { store } from "./store";
import { IComponentsRawHash } from "../core/Component";

export const register = (components: () => IComponentsRawHash): void => {
  if (!store.activeComponent) {
    return;
  }
  store.activeComponent.components = components;
};
