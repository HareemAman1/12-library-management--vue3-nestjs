import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import * as jwt from 'jsonwebtoken';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guard/roles.guard'; 
import { Roles } from '../common/roles.decorator'; 

@Controller('history')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @Roles('user', 'superuser')
  async getUserHistory(@Req() req: any) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded: any = jwt.verify(token, 'your_jwt_secret'); 
      const userid = decoded.id;

      return this.historyService.getUserHistory(userid);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
