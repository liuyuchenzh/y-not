export default function replaceDom(
  refDom: HTMLElement,
  newDoms: HTMLElement | HTMLElement[],
  ...extraDoms: HTMLElement[]
): void {
  const newDomsArr: HTMLElement[] = Array.isArray(newDoms)
    ? [...newDoms, ...extraDoms]
    : [newDoms, ...extraDoms];
  if ("jQuery" in window) {
    $(refDom).replaceWith(newDomsArr);
    return;
  }
  const parent: HTMLElement | null = refDom.parentElement;
  if (!parent) {
    return;
  }
  if (!newDomsArr.length) {
    throw new Error("Need to provide new DOM!");
  }
  let ref: HTMLElement = refDom;
  for (let i = newDomsArr.length - 1; i >= 0; i--) {
    const newDom: HTMLElement = newDomsArr[i];
    parent.insertBefore(newDom, ref);
    ref = newDom;
  }
  parent.removeChild(refDom);
}
