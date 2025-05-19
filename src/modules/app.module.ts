import { Module } from '@nestjs/common';
import { PatientModule } from './patient.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../models/patient.model';
import { HeartRate } from '../models/heartRate.model';
import { EntitiesModule } from './entities.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'fe'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite', // or 'postgres'
      database: 'db.sqlite',
      entities: [Patient, HeartRate],
      synchronize: true, // turn off in production
    }),
    EntitiesModule,
    PatientModule,
  ]
})
export class AppModule {}
