import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { IssueBook } from '../entities/details.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([IssueBook]),
  JwtModule.register({
    secret: 'your_jwt_secret',
    signOptions: { expiresIn: '10h' },
  }),],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
