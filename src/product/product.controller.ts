import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product } from './entities/product.entity';
import { FileUploadService } from './file-upload.service';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly fileUploadService: FileUploadService,
    ) { }

    @Get()
    async findAll(
        @Query('search') search: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10
    ): Promise<any> {
        const products = await this.productService.findAll(search, page, limit);
        const totalItems = await this.productService.count(search);
        const totalPages = Math.ceil(totalItems / limit);

        return {
            items: products,
            totalPages,
        };
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOne(+id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() image: Express.Multer.File,
    ) {
        if (image) {
            const imagePath = await this.fileUploadService.uploadImage(image);
            createProductDto.image = `${imagePath}`;
        }
        return this.productService.create(createProductDto);
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile() image?: Express.Multer.File,
    ) {
        if (image) {
            const product = await this.productService.findOne(+id);
            await this.fileUploadService.deleteImage(product.image);

            const imagePath = await this.fileUploadService.uploadImage(image);
            updateProductDto.image = `http://localhost:8001${imagePath}`;
        }
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        const product = await this.productService.findOne(+id);
        await this.productService.remove(+id);
        await this.fileUploadService.deleteImage(product.image);
    }
}
