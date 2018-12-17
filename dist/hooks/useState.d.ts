declare type IStateResult<StateType = any> = [() => StateType, (newState: StateType) => any];
export declare function useState<StateType = any>(initialState: StateType): IStateResult<StateType>;
export {};
