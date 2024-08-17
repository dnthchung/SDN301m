import { Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
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

  createProduct(productDTOReceived: Product): Product {
    //solve new product
    const newProduct: Product = {
      id: Math.floor(Math.random() * 1000),
      ...productDTOReceived,
    };
    //save to database
    this.products.push(newProduct);
    return newProduct;
  }

  getProductDetails(idInput: number): Product {
    //The + operator before idInput is a shorthand way(viết tắt) to convert the idInput string to a number
    // return this.products.find((product) => product.id === +idInput);
    //phải ép kiểu vì id của product là number, còn idInput là string
    // return this.products.find((product) => product.id === Number(idInput));
    return this.products.find((product) => product.id === idInput);
  }

  updateProduct(myIdInput: string): string {
    return 'Update a product ' + `${myIdInput}`;
  }

  deleteProduct(myIdDelete: string): string {
    return 'Delete a product ' + `${myIdDelete}`;
  }
}
