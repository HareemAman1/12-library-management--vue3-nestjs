import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssueBook } from '../entities/details.entity'
import { Book } from '../entities/book.entity'; 

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(IssueBook)
    private readonly issueRepository: Repository<IssueBook>,

    @InjectRepository(Book)
    private readonly libraryRepository: Repository<Book>
  ) {}

  async createIssue(id: string, userid: number, username: string, book_name: string, issue_date: string, due_date: string, status: string) {
    const queryRunner = this.issueRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const issue = this.issueRepository.create({ userid, username, book_name, issue_date, due_date, status });
      const result = await queryRunner.manager.save(IssueBook, issue);
      const issueId = result.id;

      if (status === 'pending') {
        await queryRunner.manager.decrement(Book, { id: Number(id) }, 'amount', 1);
      }

      await queryRunner.commitTransaction();
      return { id: issueId };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(`Error creating issue record: ${error.message}`);
      throw new InternalServerErrorException('Error creating issue record');
    } finally {
      await queryRunner.release();
    }
  }
}
