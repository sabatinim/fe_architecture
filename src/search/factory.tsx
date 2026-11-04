import { eventBus } from "../shared/eventBus.js";
import { InMemoryProductSearchRepository } from "./infrastructure/repository/inMemoryProductSearchRepository.js";
import { Search } from "./service/search.js";
import { Product } from "./domain/productSearchRepository.js";


export function createSearch(): Search {
  const products = Array.from({ length: 10 }, (_, index) => {
    const number = index + 1;
    return new Product(
      String(number),
      `Product ${number}`,
      Number((number * 9.99).toFixed(2)),
      `Description for product ${number}`,
    );
  });

  return new Search(new InMemoryProductSearchRepository(products), eventBus);
}
