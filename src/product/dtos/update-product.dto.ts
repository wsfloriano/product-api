import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    id: number;
    image: string;
    name: string;
    categories: string;
    price: number;
    brand: string;
}
