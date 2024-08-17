import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    // console.log('errors', errors);

    // if (errors.length > 0) {
    //   //can customize error message
    //   throw new BadRequestException('Validation failed. (pipe)');
    // }

    if (errors.length > 0) {
      const errorMessages = errors.map(
        (error) =>
          //   `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
          //   `${error.property} has wrong value input, ${Object.values(error.constraints).join(', ')}`,
          `${Object.values(error.constraints).join(', ')}`,
        /**
         * Object.values(error.constraints)
         * -> returns: ['Category ID is required.', 'Product name is too short, must be at least 5 characters.']
         *
         * Object.values(error.constraints).join(', ')
         * -> returns: 'Category ID is required., Product name is too short, must be at least 5 characters.'
         */
      );
      throw new BadRequestException(errorMessages);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
