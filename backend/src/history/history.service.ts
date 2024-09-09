import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IssueBook } from '../entities/details.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(IssueBook)
    private readonly issueBookRepository: Repository<IssueBook>,
  ) {}

  async getUserHistory(userid: number): Promise<IssueBook[]> {
    try {
      return await this.issueBookRepository.find({ where: { userid } });
    } catch (error) {
      console.error(`Error fetching user history: ${error.message}`);
      throw new InternalServerErrorException('Error fetching user history');
    }
  }
}
