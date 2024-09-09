import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueBook } from '../entities/details.entity';
import { Book } from '../entities/book.entity';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([IssueBook, Book]),
  JwtModule.register({
    secret: 'your_jwt_secret',
    signOptions: { expiresIn: '10h' },
  }),],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
