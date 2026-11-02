import { eventBus } from "../shared/eventBus.js";
import { InMemoryProductSearchRepository } from "./infrastructure/repository/inMemoryProductSearchRepository.js";
import { Search } from "./service/search.js";
import { Product } from "./domain/productSearchRepository.js";


export function createSearch(): Search {
  const p = new Product("1", "Product 1", 19.99, "A simple product");
  return new Search(new InMemoryProductSearchRepository([p]), eventBus);
}
