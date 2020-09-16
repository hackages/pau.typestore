import { IAction, IState, IReducers, ISubscriber } from "./type";

export class Store {
  private subscribers: ISubscriber[]; // TODO: What would be the type of this?
  private reducers: IReducers; // TODO: What would be the type of this?
  private state: IState; // TODO: What would the type of this?

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, { type: "Redux/Init" });
  }

  get value() {
    return this.state;
  }

  subscribe(fn: ISubscriber) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== fn);
    };
  }

  dispatch(action: IAction) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach((fn) => fn(this.value));
  }

  private reduce(state: IState, action: IAction) {
    const newState: any = {};
    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
