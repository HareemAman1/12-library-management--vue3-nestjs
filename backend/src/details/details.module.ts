import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { IssueBook } from '../entities/details.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([IssueBook]),
  JwtModule.register({
    secret: 'your_jwt_secret',
    signOptions: { expiresIn: '10h' },
  }),],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
