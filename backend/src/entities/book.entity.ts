// src/books/entities/book.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('library_books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  book_name: string;

  @Column({ type: 'varchar', length: 255 })
  author: string;

  @Column({ type: 'int' })
  amount: number;
}
