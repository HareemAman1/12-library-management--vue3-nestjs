import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User } from '../entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret: 'your_jwt_secret',
    signOptions: { expiresIn: '10h' },
  }),],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
