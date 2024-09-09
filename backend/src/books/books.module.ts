import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from '../entities/book.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    JwtModule.register({
      secret: 'your_jwt_secret',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
