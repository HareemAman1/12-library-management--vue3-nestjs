import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { IssueService } from './issue.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guard/roles.guard'; 
import { Roles } from '../common/roles.decorator'; 

@Controller('issue')
@UseGuards(JwtAuthGuard, RolesGuard)

export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post(':id')
  @Roles('user', 'superuser')
  async createIssue(
    @Param('id') id: string,
    @Body() createIssueDto: { userid: number; username: string; book_name: string; issue_date: string; due_date: string; status?: string }
  ) {
    const { userid, username, book_name, issue_date, due_date, status = 'pending' } = createIssueDto;
    return this.issueService.createIssue(id, userid, username, book_name, issue_date, due_date, status);
  }
}
