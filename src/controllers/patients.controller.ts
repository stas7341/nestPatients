import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PatientsService } from '../services/patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('high-heart-rate-events')
  async getAllHighHeartRateEvents() {
    return this.patientsService.getAllHighHeartRateEvents();
  }

  // /patients/1/analytics?start=2024-03-01T00:00:00Z&end=2024-03-02T00:00:00Z
  @Get(':id/analytics')
  async getAnalytics(
    @Param('id') id: number,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.patientsService.getAnalytics(+id, startDate, endDate);
  }

  @Get(':id/?')
  async getPatient(@Param('id') id: number) {
    const patient = await this.patientsService.getPatient(id);
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }
}
