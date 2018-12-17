import { store } from "./store";
import Component from "../core/Component";

const defaultFn = () => {};

type EffectHook = (ref: HTMLElement) => any;

export function useEffect(didMountHook: EffectHook) {
  const { activeComponent, effectList } = store;
  let result = defaultFn;
  function didMount() {
    const ref: HTMLElement = (activeComponent as Component).ref;
    result = didMountHook(ref);
  }
  function willUnMount() {
    if (typeof result === "function") {
      result();
    }
  }
  effectList.push([didMount, willUnMount]);
}
