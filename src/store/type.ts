export interface ITodo {
  label: string;
  complete: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}
export interface IState {
  [key: string]: any;
}

export interface IReducerFn {
  (state: IState, action: IAction): IState;
}
export interface IReducers {
  [key: string]: IReducerFn;
}
export interface ISubscriber {
  (value: IState): void;
}
