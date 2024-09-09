// src/details/entities/issue-book.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('issue_book')
export class IssueBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  userid: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  book_name: string;

  @Column({ type: 'date', nullable: false })
  issue_date: Date;

  @Column({ type: 'date', nullable: false })
  due_date: Date;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string;
}
