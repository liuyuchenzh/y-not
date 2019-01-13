import Component from "./Component";
export function render(
  el: string,
  RootComponent: new (option: { el: string }) => Component
) {
  return new RootComponent({ el }).init();
}
