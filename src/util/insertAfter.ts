export default function insertAfter(
  ref: HTMLElement,
  newDom: HTMLElement
): void {
  const parent: HTMLElement | null = ref.parentElement;
  if (!parent) {
    return;
  }
  const next: Element | null = ref.nextElementSibling;
  if (!next) {
    parent.appendChild(newDom);
  } else {
    parent.insertBefore(newDom, next);
  }
}
