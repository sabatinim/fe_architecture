import { ProductSearchRepository, Products } from "../domain/productSearchRepository.js";
import { AppEvents, EventBus } from "../../shared/eventBus.js";

export class Search {
  private readonly searchRepository: ProductSearchRepository;
  private readonly eventBus: EventBus<AppEvents>;

  constructor(searchRepository: ProductSearchRepository, eventBus: EventBus<AppEvents>) {
    this.searchRepository = searchRepository;
    this.eventBus = eventBus;
  }

  subscribe<K extends keyof AppEvents>(
    event: K, 
    listener: (data: AppEvents[K]) => void
  ): () => void {
    return this.eventBus.on(event, listener);
  }

  queryChanged(query: string): void {
    this.eventBus.emit("searchQueryChanged", { query });
  }

  async execute(query: string): Promise<Products> {
    return this.searchRepository.search(query)
        .then((results) => { 
            this.eventBus.emit("searchExecuted", { query, results });
            return Promise.resolve(results);
        }).catch((error) => {
            this.eventBus.emit("searchFailed", { query, error });
            return Promise.reject(error);
    });
    }
}
