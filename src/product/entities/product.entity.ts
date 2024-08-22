import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;

    @Column()
    name: string;

    @Column()
    categories: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    brand: string;
}
