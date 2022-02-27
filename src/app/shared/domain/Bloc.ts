import { Subscription } from "./Subscription";

export abstract class Bloc<T> {
  private internalState: T;
  private subscribers: Set<Subscription<T>> = new Set();

  constructor(initialState: T) {
    this.internalState = initialState;
  }

  public get state(): T {
    return this.internalState;
  }

  changeState(state?: T) {
    this.internalState = state ?? this.internalState;

    if (this.subscribers.size > 0) {
      this.subscribers.forEach((subscriber) => subscriber(this.state));
    }
  }

  subscribe(subscriber: Subscription<T>) {
    if (this.subscribers.has(subscriber)) {
      throw new Error("This subscriber has already registered");
    }
    this.subscribers.add(subscriber);
    this.changeState();
  }

  unsubscribe(subscriber: Subscription<T>) {
    if (!this.subscribers.has(subscriber)) {
      throw new Error("This subscriber is not registered");
    }
    this.subscribers.delete(subscriber);
  }
}
