export class Product {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly description: string,
  ) {}
}

export class Products {
  constructor(private readonly products: Product[]) {}

  get items(): readonly Product[] {
    return this.products;
  }
}

export interface ProductSearchRepository {
  search(query: string): Promise<Products>;
}