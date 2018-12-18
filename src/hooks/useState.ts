import { store } from "./store";
import Component from "../core/Component";

type IStateResult<StateType = any> = [
  () => StateType,
  (newState: StateType) => any
];

export function useState<StateType = any>(
  initialState: StateType
): IStateResult<StateType> {
  const { activeComponent, stateList: list } = store;
  const index: number = list.length;
  const result: IStateResult<StateType> = [
    () => {
      if (!activeComponent) {
        return initialState;
      }
      const hasState = !!activeComponent.state;
      if (!hasState) {
        return initialState;
      }
      return (activeComponent.state as {
        [index: number]: StateType;
      })[index];
    },
    (newState: any) => {
      if (!activeComponent) {
        return;
      }
      (activeComponent as Component).setState({
        [index]: newState
      });
    }
  ];
  list.push(initialState);
  return result;
}
