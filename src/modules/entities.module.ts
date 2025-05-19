import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityService } from '../services/entity.service';
import { Patient } from '../models/patient.model';
import { HeartRate } from '../models/heartRate.model';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, HeartRate])],
  providers: [EntityService],
})
export class EntitiesModule {}
