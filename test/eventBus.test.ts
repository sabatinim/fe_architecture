import assert from "node:assert/strict";
import test from "node:test";
import { EventBus, type AppEvents } from "../src/shared/eventBus.js";

test("delivers events to subscribers and stops after unsubscribe", () => {
  interface TestEvents { messageSent: string }
  const eventBus = new EventBus<TestEvents>();
  const received: string[] = [];
  const onMessageSent = (message: string) => received.push(message);

  const unsubscribe = eventBus.on("messageSent", onMessageSent);

  eventBus.emit("messageSent", "first");
  unsubscribe();
  eventBus.emit("messageSent", "second");

  assert.deepEqual(received, ["first"]);
});