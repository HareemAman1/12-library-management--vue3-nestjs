import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssueBook } from '../entities/details.entity';

@Injectable()
export class DetailsService {
  constructor(
    @InjectRepository(IssueBook)
    private readonly issueBookRepository: Repository<IssueBook>,
  ) {}

  async findAll(): Promise<IssueBook[]> {
    try {
      return await this.issueBookRepository.find();
    } catch (error) {
      console.error('Error fetching issue_book data:', error);
      throw new Error('Error fetching issue_book data');
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const result = await this.issueBookRepository.delete(id);
      if (result.affected === 0) {
        throw new Error('No data found for the given ID');
      }
    } catch (error) {
      console.error('Error deleting issue_book data:', error);
      throw new Error('Error deleting issue_book data');
    }
  }

  async findById(id: string): Promise<IssueBook> {
    try {
      const issueBook = await this.issueBookRepository.findOneBy({ id: Number(id) });
      if (!issueBook) {
        throw new Error('No data found for the given ID');
      }
      return issueBook;
    } catch (error) {
      console.error('Error fetching issue_book data by ID:', error);
      throw new Error('Error fetching issue_book data by ID');
    }
  }

  async updateById(id: string, updateData: Partial<IssueBook>): Promise<IssueBook> {
    const issueBook = await this.issueBookRepository.preload({
      id: Number(id),
      ...updateData,
    });
    if (!issueBook) {
      throw new Error('No data found for the given ID to update');
    }

    try {
      const updatedIssueBook = await this.issueBookRepository.save(issueBook);

      if (updateData.status === 'cleared') {
      }

      return updatedIssueBook;
    } catch (error) {
      console.error('Error updating issue_book data:', error);
      throw new Error('Error updating issue_book data');
    }
  }
}
