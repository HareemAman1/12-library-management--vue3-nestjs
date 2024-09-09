import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../common/roles.decorator';

@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply guards globally for this controller
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // ACCESS BY BOTH 'USER' AND 'SUPERUSER'
  @Get()
  async getBooks() {
    return await this.booksService.getBooks();
  }

  // ACCESS BY 'SUPERUSER' ONLY
  @Post('add')
  @Roles('superuser') // Specify that this route is restricted to 'superuser' role
  async addBook(
    @Body('book_name') bookName: string,
    @Body('author') author: string,
    @Body('amount') amount: number,
  ) {
    return await this.booksService.addBook(bookName, author, amount);
  }
}
