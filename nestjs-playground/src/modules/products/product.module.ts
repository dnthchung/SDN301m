import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';

@Module({
  imports: [],
  controllers: [
    // Import the ProductController into the controllers
    // array in the ProductModule
    ProductController,
  ],
  providers: [],
})
export class ProductModule {}
