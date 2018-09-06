export default function replaceDom(
  refDom: HTMLElement,
  newDoms: HTMLElement | HTMLElement[],
  ...extraDoms: HTMLElement[]
): void {
  const parent: HTMLElement | null = refDom.parentElement;
  if (!parent) {
    return;
  }
  let doms: HTMLElement[];
  if (Array.isArray(newDoms)) {
    doms = newDoms.concat(extraDoms);
  } else {
    doms = [newDoms, ...extraDoms];
  }
  if (!doms.length) {
    throw new Error("Need to provide new DOM!");
  }
  let ref: HTMLElement = refDom;
  for (let i = doms.length - 1; i >= 0; i--) {
    const newDom: HTMLElement = doms[i];
    parent.insertBefore(newDom, ref);
    ref = newDom;
  }
  parent.removeChild(refDom);
}
