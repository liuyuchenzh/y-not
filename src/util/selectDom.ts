export default function selectDom(
  selector: string,
  context: HTMLElement | Document = document
): HTMLElement | null {
  if ("jQuery" in window) {
    return $(context as HTMLElement).find(selector)[0];
  } else {
    return context.querySelector(selector);
  }
}
