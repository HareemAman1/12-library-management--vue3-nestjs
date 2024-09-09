import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard'; 
import { Roles } from '../common/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @Roles('superuser')
  async getUsers() {
    return await this.dashboardService.getUsers();
  }

  @Delete(':id')
  @Roles('superuser')
  async deleteUser(@Param('id') id: string) {
    return await this.dashboardService.deleteUser(id);
  }

  @Get(':id')
  @Roles('superuser')
  async getUserById(@Param('id') id: string) {
    return await this.dashboardService.getUserById(id);
  }

  @Put(':id')
  @Roles('superuser')
  async updateUser(
    @Param('id') id: string,
    @Body()
    updateData: {
      username?: string;
      email?: string;
      password?: string;
      roles?: string;
    },
  ) {
    return await this.dashboardService.updateUser(id, updateData);
  }
}
