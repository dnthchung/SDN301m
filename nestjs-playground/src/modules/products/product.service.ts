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

  // updateProduct(myIdInput: string): string {
  updateProduct(myProductFromController: ProductDTO, myId: number): Product {
    //get id from myProductFromController
    const idProduct = Number(myId);
    //find product by id
    const product = this.products.find(
      (productItem) => productItem.id === idProduct,
    );
    //update product
    //    //if name is null, keep the old name -> nếu người dùng không nhập name thì giữ nguyên name cũ
    // productFound.name = name ? name : productFound.name;
    product.productName = myProductFromController.productName;
    product.price = myProductFromController.price;
    //return product updated
    return product;
  }

  deleteProduct(myIdDelete: number): boolean {
    //find product by id
    const product = this.products.find(
      (productItem) => productItem.id === myIdDelete,
    );
    //delete product
    this.products = this.products.filter(
      (productItem) => productItem.id !== myIdDelete,
    );
    //return true if delete success
    return true;
  }
}
