import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

/**
 * - khi truy cập url /products thì sẽ khởi tạo 1 đối tượng ProductService và gọi tới phương thức tương ứng, ví dụ: getAllProducts
 */
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //get
  @Get()
  getAllProducts(): string {
    return this.productService.getAllProducts();
  }

  //post
  @Post()
  createProduct(): string {
    return this.productService.createProduct();
  }

  //get product details
  @Get('/:id')
  getProductDetails(@Param('id') myId: string): string {
    return this.productService.getProductDetails(myId);
  }

  //put
  @Put('/:id')
  updateProduct(): string {
    return this.productService.updateProduct();
  }

  //delete
  @Post('/:id')
  deleteProduct(): string {
    return this.productService.deleteProduct();
  }
}
