import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatusCode } from 'src/global/globalEnum';
import { Product } from 'src/models/product.model';
import { ProductDTO } from 'src/dto/product.dto';

/**
 * - khi truy cập url /products thì sẽ khởi tạo 1 đối tượng ProductService và gọi tới phương thức tương ứng, ví dụ: getAllProducts
 * - custom 1 global class ResponseData để trả về dữ liệu có type rõ ràng
 * - còn các properties của ResponseData thì lấy từ globalEnum
 * - ban đầu :"// return this.productService.getAllProducts()"
 *
 * -
 */
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //get
  @Get()
  getAllProducts(): ResponseData<Product[]> {
    try {
      //khởi tạo đối tượng ResponseData và trả về dữ liệu"
      return new ResponseData<Product[]>(
        this.productService.getAllProducts(),
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product[]>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Get product details by ID
  @Get('/:id')
  getProductDetails(@Param('id') myId: string): ResponseData<Product> {
    try {
      //   const productDetails = this.productService.getProductDetails(myId);
      const productDetails = this.productService.getProductDetails(
        Number(myId),
      );
      return new ResponseData<Product>(
        productDetails,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Create a product
  @Post()
  createProduct(
    @Body() productDTOClientInput: ProductDTO,
  ): ResponseData<ProductDTO> {
    try {
      const result = this.productService.createProduct(productDTOClientInput);
      return new ResponseData<Product>(
        result,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Update a product by ID
  @Put('/:id')
  updateProduct(
    @Param('id') myId: number,
    @Body() productInputDTO: ProductDTO,
  ): ResponseData<Product> {
    try {
      const result = this.productService.updateProduct(productInputDTO, myId);
      return new ResponseData<Product>(
        result,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<Product>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }

  // Delete a product by ID
  @Delete('/:id')
  deleteProduct(@Param('id') myId: number): ResponseData<boolean> {
    try {
      const result = this.productService.deleteProduct(myId);
      return new ResponseData<boolean>(
        result,
        HttpStatusCode.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<boolean>(
        null,
        HttpStatusCode.ERROR,
        HttpMessage.ERROR,
      );
    }
  }
}
