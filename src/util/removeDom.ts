export default function removeDom(dom: Element): void {
  const parent: HTMLElement | null = dom.parentElement;
  if (!parent) {
    return;
  }
  parent.removeChild(dom);
}
