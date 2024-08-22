import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async findAll(search: string = '', page: number = 1, limit: number = 10): Promise<{ data: Product[], totalPages: number }> {
        const [products, total] = await this.productRepository.findAndCount({
            where: search ? { name: Like(`%${search}%`) } : {},
            skip: (page - 1) * limit,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return { data: products, totalPages };
    }

    findOne(id: number): Promise<Product> {
        return this.productRepository.findOneBy({ id });
    }

    create(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.productRepository.preload({
            id: id,
            ...updateProductDto,
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return this.productRepository.save(product);
    }

    async remove(id: number): Promise<void> {
        await this.productRepository.delete(id);
    }

    count(search: string = ''): Promise<number> {
        return this.productRepository.count({
            where: search ? { name: Like(`%${search}%`) } : {},
        });
    }
}
