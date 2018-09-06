declare module "diff-dom" {
  export default DiffDOM;
  class DiffDOM {
    constructor(...args: any[]);
    public diff(prevElement: HTMLElement, newElement: Element): any;
    public apply(element: HTMLElement, diff: any): void;
  }
}
