import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatusCode } from 'src/global/globalEnum';

/**
 * - khi truy cập url /products thì sẽ khởi tạo 1 đối tượng ProductService và gọi tới phương thức tương ứng, ví dụ: getAllProducts
 * - custom 1 global class ResponseData để trả về dữ liệu có type rõ ràng
 * - còn các properties của ResponseData thì lấy từ globalEnum
 * - ban đầu :"// return this.productService.getAllProducts()"
 *
 */
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //get
  @Get()
  getAllProducts(): ResponseData<string> {
    try {
      //khởi tạo đối tượng ResponseData và trả về dữ liệu"
      return new ResponseData<string>(
        this.productService.getAllProducts(),
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Create a product
  @Post()
  createProduct(): ResponseData<string> {
    try {
      const result = this.productService.createProduct();
      return new ResponseData<string>(
        result,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Get product details by ID
  @Get('/:id')
  getProductDetails(@Param('id') myId: string): ResponseData<string> {
    try {
      const productDetails = this.productService.getProductDetails(myId);
      return new ResponseData<string>(
        productDetails,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Update a product by ID
  @Put('/:id')
  updateProduct(@Param('id') myId: string): ResponseData<string> {
    try {
      const result = this.productService.updateProduct(myId);
      return new ResponseData<string>(
        result,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Delete a product by ID
  @Delete('/:id')
  deleteProduct(@Param('id') myId: string): ResponseData<string> {
    try {
      const result = this.productService.deleteProduct(myId);
      return new ResponseData<string>(
        result,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
