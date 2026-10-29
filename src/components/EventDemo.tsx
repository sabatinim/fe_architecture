import { useEffect, useState } from "react";
import { eventBus } from "../shared/eventBus.js";

function EventSender() {
  return (
    <button
      onClick={() =>
        eventBus.emit("messageSent", { message: "Hello from another component!" })
      }
      type="button"
    >
      Send message
    </button>
  );
}

function EventReceiver() {
  const [message, setMessage] = useState("No message received yet.");

  useEffect(
    () => eventBus.on("messageSent", ({ message: nextMessage }) => setMessage(nextMessage)),
    [],
  );

  return <p role="status">{message}</p>;
}

export function EventDemo() {
  return (
    <section>
      <EventSender />
      <EventReceiver />
    </section>
  );
}
