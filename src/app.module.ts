import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { config } from './utils/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ProductModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
