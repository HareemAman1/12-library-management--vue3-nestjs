import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { DetailsService } from './details.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guard/roles.guard'; 
import { Roles } from '../common/roles.decorator'; 

@Controller('details')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DetailsController {
  constructor(private readonly detailsService: DetailsService) {}

  @Get()
  @Roles('superuser') 
  async getAll(): Promise<any[]> {
    return this.detailsService.findAll();
  }

  @Delete(':id')
  @Roles('superuser')
  async delete(@Param('id') id: string): Promise<void> {
    await this.detailsService.deleteById(id);
  }

  @Get(':id')
  @Roles('superuser') 
  async getById(@Param('id') id: string): Promise<any> {
    return this.detailsService.findById(id);
  }

  @Put(':id')
  @Roles('superuser') 
  async update(
    @Param('id') id: string,
    @Body() updateData: any
  ): Promise<any> {
    return this.detailsService.updateById(id, updateData);
  }
}
