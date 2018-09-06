import matchEl from "./matchEl";
export default function domParser(dom: string): HTMLElement {
  const match = matchEl(dom.trim());
  if (!match) {
    throw new Error(`source: ${dom}; Not a valid element! check render()`);
  }
  const el = document.createElement(match.tag);
  el.innerHTML = match.innerHTML;
  const { attributes } = match;
  if (attributes) {
    const attr: { [index: string]: string } = {};
    attributes
      .trim()
      .replace(/([a-zA-Z]+)=([^'"]+|(['"])([^'"]+)\3)/g, (_, key, values) => {
        attr[key] = values.replace(/['"]/g, "");
        return _;
      });
    Object.entries(attr).forEach(([k, v]) => {
      el.setAttribute(k, v);
    });
  }
  return el;
}
