import assert from "node:assert/strict";
import test from "node:test";
import { EventBus } from "../src/shared/eventBus.js";
export function createMessageListener(received) {
    return function recordMessage(message) {
        received.push(message);
    };
}
test("delivers events to subscribers and stops after unsubscribe", () => {
    const eventBus = new EventBus();
    const received = [];
    const unsubscribe = eventBus.on("messageSent", createMessageListener(received));
    eventBus.emit("messageSent", "first");
    unsubscribe();
    eventBus.emit("messageSent", "second");
    assert.deepEqual(received, ["first"]);
});
