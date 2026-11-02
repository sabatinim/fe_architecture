import { ProductSearchRepository, Products } from "../domain/productSearchRepository.js";
import { AppEvents, EventBus } from "../../shared/eventBus.js";

export class Search {
  private readonly searchRepository: ProductSearchRepository;
  private readonly eventBus: EventBus<AppEvents>;

  constructor(searchRepository: ProductSearchRepository, eventBus: EventBus<AppEvents>) {
    this.searchRepository = searchRepository;
    this.eventBus = eventBus;
  }

  subscribe(listener: (event: AppEvents["searchExecuted"]) => void): () => void {
    return this.eventBus.on("searchExecuted", listener);
  }

  async execute(query: string): Promise<Products> {
    return this.searchRepository.search(query)
        .then((results) => { 
            this.eventBus.emit("searchExecuted", { query, results });
            return Promise.resolve(results);
        }).catch((error) => {
            return Promise.reject(error);
        });   
    }
}
