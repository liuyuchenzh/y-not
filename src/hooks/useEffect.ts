import { store } from "./store";
import Component from "../core/Component";

const defaultFn = () => void 0;

type EffectHook = (ref: HTMLElement) => any;

export function useEffect(didMountHook: EffectHook) {
  const { activeComponent, effectList } = store;
  if (!activeComponent || activeComponent.mounted) {
    return;
  }
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
