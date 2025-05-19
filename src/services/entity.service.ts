import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../models/patient.model';
import { HeartRate } from '../models/heartRate.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EntityService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
    @InjectRepository(HeartRate)
    private heartRateRepo: Repository<HeartRate>,
  ) {}

  async onApplicationBootstrap() {
    const filePath = path.join(__dirname, '../repositories/patients.json');
    const data: { patients: [Patient]; heartRateReadings: [HeartRate] } =
      JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (data.patients === null || data.heartRateReadings === null) {
      throw new Error('load data failed');
    }

    const patientMap = new Map<string, Patient>();

    // Insert patients
    for (const p of data.patients) {
      const patient = this.patientRepo.create({
        id: Number(p.id), // use Number if entity expects number
        name: p.name,
        age: p.age,
        gender: p.gender,
        requestCount: 0,
      });
      const saved = await this.patientRepo.save(patient);
      patientMap.set(String(p.id), saved);
    }

    // Insert heart rate readings
    for (const hr of data.heartRateReadings) {
      const patient = patientMap.get(String(hr.patientId));
      if (!patient) continue;

      const reading = this.heartRateRepo.create({
        heartRate: hr.heartRate,
        timestamp: new Date(hr.timestamp),
        patient: patient,
      });

      try {
        await this.heartRateRepo.save(reading);
      } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          console.warn('Duplicate heart rate reading ignored.');
        } else {
          throw err;
        }
      }

    }
  }
}
