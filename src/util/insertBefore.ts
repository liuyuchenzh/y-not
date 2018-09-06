export default function insertBefore(
  ref: HTMLElement,
  newDom: HTMLElement
): void {
  const parent: HTMLElement | null = ref.parentElement;
  if (!parent) {
    return;
  }
  parent.insertBefore(newDom, ref);
}
