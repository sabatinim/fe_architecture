export class EventBus {
    listeners = {};
    on(event, listener) {
        const listeners = (this.listeners[event] ??= new Set());
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
            if (listeners.size === 0) {
                delete this.listeners[event];
            }
        };
    }
    emit(event, payload) {
        this.listeners[event]?.forEach((listener) => listener(payload));
    }
}
export const eventBus = new EventBus();
