type Listener<Payload> = (payload: Payload) => void;
export type Unsubscribe = () => void;
type ListenerMap<Events extends object> = {
  [Event in keyof Events]?: Set<Listener<Events[Event]>>;
};

export class EventBus<Events extends object> {
  private readonly listeners: ListenerMap<Events> = {};

  on<Event extends keyof Events>(
    event: Event,
    listener: Listener<Events[Event]>,
  ): Unsubscribe {
    const listeners = (this.listeners[event] ??= new Set());
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        delete this.listeners[event];
      }
    };
  }

  emit<Event extends keyof Events>(event: Event, payload: Events[Event]): void {
    this.listeners[event]?.forEach((listener) => listener(payload));
  }
}

export interface AppEvents {
  messageSent: { message: string };
  searchExecuted: { query: string; results: any};
  searchFailed: { query: string; error: Error };
}

export const eventBus = new EventBus<AppEvents>();
