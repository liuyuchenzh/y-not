export default function removeDom(dom: Element): void {
  if ("jQuery" in window) {
    $(dom).remove();
    return;
  }
  const parent: HTMLElement | null = dom.parentElement;
  if (!parent) {
    return;
  }
  parent.removeChild(dom);
}
