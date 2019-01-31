import Component from "./Component";
export declare function render(
  el: string,
  RootComponent: new (option: { el: string }) => Component
): Component<{}, {}>;
