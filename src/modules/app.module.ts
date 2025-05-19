import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { PatientModule } from './patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../models/patient.model';
import { HeartRate } from '../models/heartRate.model';
import { EntitiesModule } from './entities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // or 'postgres'
      database: 'db.sqlite',
      entities: [Patient, HeartRate],
      synchronize: true, // turn off in production
    }),
    EntitiesModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
