import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
  // mock data
  private products: Product[] = [
    {
      id: 1,
      categoryId: 1,
      productName: 'Iphone 12 Pro Max',
      price: 1000,
    },
    {
      id: 2,
      categoryId: 1,
      productName: 'Iphone 11 Pro Max',
      price: 800,
    },
    {
      id: 3,
      categoryId: 2,
      productName: 'Samsung Galaxy S21 Ultra',
      price: 900,
    },
    {
      id: 4,
      categoryId: 2,
      productName: 'Samsung Galaxy S20 Ultra',
      price: 700,
    },
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  createProduct(): string {
    return 'Create a product';
  }

  getProductDetails(idInput: string): string {
    return 'Get product details by id : ' + `${idInput}`;
  }

  updateProduct(myIdInput: string): string {
    return 'Update a product ' + `${myIdInput}`;
  }

  deleteProduct(myIdDelete: string): string {
    return 'Delete a product ' + `${myIdDelete}`;
  }
}
