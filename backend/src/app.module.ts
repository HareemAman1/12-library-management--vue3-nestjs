import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DetailsModule } from './details/details.module';
import { HistoryModule } from './history/history.module';
import { IssueModule } from './issue/issue.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'hareem123',
      database: 'projectnest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule, BooksModule, DashboardModule, DetailsModule, HistoryModule, IssueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
