export class Product {
  id?: number;
  categoryId?: number;
  productName?: string;
  price?: number;

  constructor(
    id: number,
    categoryId: number,
    productName: string,
    price: number,
  ) {
    if (id !== null) this.id = id;
    if (categoryId !== null) this.categoryId = categoryId;
    if (this.productName !== null) this.productName = productName;
    if (price !== null) this.price = price;
  }
}
