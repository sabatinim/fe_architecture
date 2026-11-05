import assert from "node:assert/strict";
import test from "node:test";
import {
  Product,
  Products,
  type ProductSearchRepository,
} from "../src/search/domain/productSearchRepository.js";
import { Search } from "../src/search/service/search.js";
import {
  EventBus,
  type AppEvents,
} from "../src/shared/eventBus.js";

class ManualProductSearchRepository implements ProductSearchRepository {
  readonly queries: string[] = [];

  constructor(
    private readonly result: Products,
    private readonly failure?: Error,
  ) {}

  async search(query: string): Promise<Products> {
    this.queries.push(query);

    if (this.failure) {
      throw this.failure;
    }

    return this.result;
  }
}

class ManualEventBus extends EventBus<AppEvents> {
  readonly emitted: Array<{
    event: keyof AppEvents;
    payload: AppEvents[keyof AppEvents];
  }> = [];

  override emit<Event extends keyof AppEvents>(
    event: Event,
    payload: AppEvents[Event],
  ): void {
    this.emitted.push({ event, payload });
    super.emit(event, payload);
  }
}

function createProducts(): Products {
  return new Products([
    new Product("1", "Keyboard", 49.99, "Mechanical keyboard"),
  ]);
}

test("execute returns repository results and emits searchExecuted", async () => {
  const results = createProducts();
  const repository = new ManualProductSearchRepository(results);
  const eventBus = new ManualEventBus();
  const search = new Search(repository, eventBus);

  const actualResults = await search.execute("keyboard");

  assert.equal(actualResults, results);
  assert.deepEqual(repository.queries, ["keyboard"]);
  assert.deepEqual(eventBus.emitted, [
    { event: "searchExecuted", payload: { query: "keyboard", results } },
  ]);
});

test("execute emits searchFailed and rethrows repository errors", async () => {
  const error = new Error("Repository unavailable");
  const repository = new ManualProductSearchRepository(Products.empty(), error);
  const eventBus = new ManualEventBus();
  const search = new Search(repository, eventBus);
  const receivedFailures: AppEvents["searchFailed"][] = [];
  search.subscribe("searchFailed", (event) => receivedFailures.push(event));

  await assert.rejects(search.execute("keyboard"), error);

  assert.deepEqual(repository.queries, ["keyboard"]);
  assert.deepEqual(eventBus.emitted, [
    { event: "searchFailed", payload: { query: "keyboard", error } },
  ]);
  assert.deepEqual(receivedFailures, [{ query: "keyboard", error }]);
});

test("subscribe receives search results and stops after unsubscribe", async () => {
  const results = createProducts();
  const repository = new ManualProductSearchRepository(results);
  const eventBus = new ManualEventBus();
  const search = new Search(repository, eventBus);
  const receivedResults: AppEvents["searchExecuted"][] = [];
  const unsubscribe = search.subscribe("searchExecuted", (event) => {
    receivedResults.push(event);
  });

  await search.execute("keyboard");
  unsubscribe();
  await search.execute("keycap");

  assert.deepEqual(receivedResults, [
    { query: "keyboard", results },
  ]);
});
