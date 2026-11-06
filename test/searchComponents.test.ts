import assert from "node:assert/strict";
import test from "node:test";
import { act, createElement } from "react";
import { JSDOM } from "jsdom";
import {
  Product,
  Products,
  type ProductSearchRepository,
} from "../src/search/domain/productSearchRepository.js";
import { Search } from "../src/search/service/search.js";
import { EventBus, type AppEvents } from "../src/shared/eventBus.js";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost",
});

Object.defineProperties(globalThis, {
  window: { configurable: true, value: dom.window },
  document: { configurable: true, value: dom.window.document },
  navigator: { configurable: true, value: dom.window.navigator },
  HTMLElement: { configurable: true, value: dom.window.HTMLElement },
  MutationObserver: { configurable: true, value: dom.window.MutationObserver },
  IS_REACT_ACT_ENVIRONMENT: { configurable: true, value: true },
});

const { createRoot } = await import("react-dom/client");
const { default: SearchInput } = await import("../src/search/infrastructure/ui/searchInput.js");
const { default: SearchResults } = await import("../src/search/infrastructure/ui/searchResults.js");

class ManualSearch extends Search {
  readonly queries: string[] = [];
  private readonly events: EventBus<AppEvents>;

  constructor() {
    const repository: ProductSearchRepository = {
      search: async () => Products.empty(),
    };
    const events = new EventBus<AppEvents>();
    super(repository, events);
    this.events = events;
  }

  override async execute(query: string): Promise<Products> {
    this.queries.push(query);
    return Products.empty();
  }

  emit<Event extends keyof AppEvents>(
    event: Event,
    payload: AppEvents[Event],
  ): void {
    this.events.emit(event, payload);
  }
}

function createProducts(): Products {
  return new Products([
    new Product("1", "Keyboard", 49.99, "Mechanical keyboard"),
  ]);
}

async function withRenderedComponent(
  render: (search: ManualSearch) => ReturnType<typeof createElement>,
  verify: (
    container: HTMLElement,
    search: ManualSearch,
    rerender: (element: ReturnType<typeof createElement>) => Promise<void>,
  ) => Promise<void>,
): Promise<void> {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const search = new ManualSearch();

  try {
    await act(async () => {
      root.render(render(search));
    });
    await verify(container, search, async (element) => {
      await act(async () => {
        root.render(element);
      });
    });
  } finally {
    await act(async () => {
      root.unmount();
    });
    container.remove();
  }
}

test("SearchInput shows validation for short queries and executes valid queries", async () => {
  await withRenderedComponent(
    (search) => createElement(SearchInput, { search }),
    async (container, search) => {
      const input = container.querySelector<HTMLInputElement>('input[aria-label="Search"]');
      assert.ok(input);

      const setValue = Object.getOwnPropertyDescriptor(
        input.ownerDocument.defaultView!.HTMLInputElement.prototype,
        "value",
      )!.set!;

      await act(async () => {
        setValue.call(input, "abc");
        input.dispatchEvent(new window.Event("input", { bubbles: true }));
      });

      assert.match(container.textContent ?? "", /Enter at least 4 characters to search\./);

      await act(async () => {
        setValue.call(input, "keyboard");
        input.dispatchEvent(new window.Event("input", { bubbles: true }));
      });

      assert.deepEqual(search.queries, ["keyboard"]);
    },
  );
});

test("SearchResults renders products from searchExecuted", async () => {
  await withRenderedComponent(
    (search) => createElement(SearchResults, { search, query: "keyboard" }),
    async (container, mountedSearch) => {
      await act(async () => {
        mountedSearch.emit("searchExecuted", {
          query: "keyboard",
          results: createProducts(),
        });
      });

      assert.match(container.textContent ?? "", /Keyboard/);
      assert.match(container.textContent ?? "", /49\.99/);
      assert.match(container.textContent ?? "", /Mechanical keyboard/);
    },
  );
});

test("SearchResults renders empty and error states from their events", async () => {
  await withRenderedComponent(
    (search) => createElement(SearchResults, { search, query: "missing" }),
    async (container, mountedSearch) => {
      await act(async () => {
        mountedSearch.emit("searchExecuted", {
          query: "missing",
          results: Products.empty(),
        });
      });
      assert.match(container.textContent ?? "", /No products found\./);

      await act(async () => {
        mountedSearch.emit("searchFailed", {
          query: "missing",
          error: new Error("Search is unavailable"),
        });
      });
      assert.match(container.textContent ?? "", /Search is unavailable/);
    },
  );
});

test("SearchResults clears and ignores results when the query changes", async () => {
  await withRenderedComponent(
    (search) => createElement(SearchResults, { search, query: "keyboard" }),
    async (container, mountedSearch, rerender) => {
      await act(async () => {
        mountedSearch.emit("searchExecuted", {
          query: "keyboard",
          results: createProducts(),
        });
      });
      assert.match(container.textContent ?? "", /Keyboard/);

      await rerender(createElement(SearchResults, { search: mountedSearch, query: "key" }));
      assert.doesNotMatch(container.textContent ?? "", /Keyboard/);

      await act(async () => {
        mountedSearch.emit("searchFailed", {
          query: "keyboard",
          error: new Error("Stale search error"),
        });
      });
      assert.doesNotMatch(container.textContent ?? "", /Stale search error/);
    },
  );
});
