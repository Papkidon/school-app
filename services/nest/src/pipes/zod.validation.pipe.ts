import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Schema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.schema.parse(value);
      return await value;
    } catch (error) {
      throw new HttpException(error.issues, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
