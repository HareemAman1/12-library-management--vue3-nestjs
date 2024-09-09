import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getBooks() {
    try {
      return await this.bookRepository.find();
    } catch (error) {
      throw new Error(`Error fetching books: ${error.message}`);
    }
  }

  async addBook(bookName: string, author: string, amount: number) {
    const newBook = this.bookRepository.create({ book_name: bookName, author, amount });

    try {
      return await this.bookRepository.save(newBook);
    } catch (error) {
      throw new Error(`Error adding book: ${error.message}`);
    }
  }
}
