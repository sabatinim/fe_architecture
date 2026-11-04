export class Product {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly description: string,
  ) {}
}

export class Products {
  private readonly products: Product[];
  constructor(products: Product[] = []) {
    this.products = products;
  }

  get items(): readonly Product[] {
    return this.products;
  }

  isEmpty(): boolean {
    return this.products.length === 0;
  }

  static empty(): Products {
    return new Products([]);
  }
}

export interface ProductSearchRepository {
  search(query: string): Promise<Products>;
}