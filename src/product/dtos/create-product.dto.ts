import { PartialType } from '@nestjs/mapped-types';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends PartialType(Product) {
    id: number;
    image: string;
    name: string;
    categories: string;
    price: number;
    brand: string;
}
