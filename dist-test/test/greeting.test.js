import assert from "node:assert/strict";
import test from "node:test";
import { greeting } from "../src/greeting.js";
test("greeting returns the welcome message", () => {
    assert.equal(greeting(), "Hello, TypeScript!");
});
