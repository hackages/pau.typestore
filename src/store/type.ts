export interface ITodo {
  label: string;
  complete: boolean;
}

export interface IAction {
  type: string;
  payload?: any;
}
