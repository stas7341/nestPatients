import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../models/patient.model';
import { HeartRate } from '../models/heartRate.model';
import { PatientsController } from '../controllers/patients.controller';
import { PatientsService } from '../services/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, HeartRate])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientModule {}
