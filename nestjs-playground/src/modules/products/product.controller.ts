import { Controller, Get, Post } from '@nestjs/common';

@Controller('products')
export class ProductController {
  //get
  @Get()
  getAllProducts() {
    return 'Get all products';
  }

  //post
  @Post()
  createProduct() {
    return 'Create a product';
  }

  //get product details
  @Get('/:id')
  getProductDetails() {
    return 'Get product details';
  }

  //put
  @Post('/:id')
  updateProduct() {
    return 'Update a product';
  }

  //delete
  @Post('/:id')
  deleteProduct() {
    return 'Delete a product';
  }
}
