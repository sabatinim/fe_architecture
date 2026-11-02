import { ProductSearchRepository, Products, Product } from "../../domain/productSearchRepository.js";

export class InMemoryProductSearchRepository implements ProductSearchRepository {
  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  async search(query: string): Promise<Products> {
    const timeout = 2000; // 2 seconds delay
    
    return new Promise<Products>(
      (resolve, reject) => setTimeout(
        () => {
          if (query === "aaaa") {
            reject(new Error('Search failed for query "aaaa".'));
            return;
          }

          resolve(new Products(this.products));
        },
        timeout
      )
    );

  }
}