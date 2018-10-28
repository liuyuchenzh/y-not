export default function insertBefore(
  ref: HTMLElement,
  newDom: HTMLElement
): void {
  if ("jQuery" in window) {
    $(newDom).insertBefore(ref);
    return;
  }
  const parent: HTMLElement | null = ref.parentElement;
  if (!parent) {
    return;
  }
  parent.insertBefore(newDom, ref);
}
