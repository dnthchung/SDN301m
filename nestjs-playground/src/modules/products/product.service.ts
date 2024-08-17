import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getAllProducts(): string {
    return 'Get all products';
  }

  createProduct(): string {
    return 'Create a product';
  }

  getProductDetails(idInput: string): string {
    return 'Get product details by id : ' + `${idInput}`;
  }

  updateProduct(): string {
    return 'Update a product';
  }

  deleteProduct(): string {
    return 'Delete a product';
  }
}
