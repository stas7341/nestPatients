import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../models/patient.model';
import { HeartRate } from '../models/heartRate.model';
import { Between, MoreThan, Repository } from 'typeorm';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(HeartRate)
    private heartRateRepo: Repository<HeartRate>,
  ) {}

  async getPatient(id: number) {
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['heartRates'],
    });

    if (!patient) {
      return null;
    }

    // Update request count
    await this.patientRepo.update(id, {
      requestCount: patient.requestCount + 1,
    });

    // Return updated patient (optional: re-fetch if needed)
    return {
      ...patient,
      requestCount: patient.requestCount + 1,
    };
  }

  async getAllHighHeartRateEvents() {
    const readings = await this.heartRateRepo.find({
      where: { heartRate: MoreThan(100) },
      relations: ['patient'],
      order: { timestamp: 'ASC' },
    });

    const results = new Map<number, { patient: any; highHeartRateEvents: any[] }>();

    for (const reading of readings) {
      const patient = reading.patient;
      if (!patient) continue;

      if (!results.has(patient.id)) {
        results.set(patient.id, {
          patient: {
            id: patient.id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
          },
          highHeartRateEvents: [],
        });
      }

      results.get(patient.id).highHeartRateEvents.push({
        heartRate: reading.heartRate,
        timestamp: reading.timestamp,
      });
    }

    return Array.from(results.values());
  }

  async getAnalytics(id: number, start: Date, end: Date) {
    const data = await this.heartRateRepo.find({
      where: {
        patient: { id },
        timestamp: Between(start, end),
      },
    });

    if (!data.length) {
      return {
        patientId: id,
        start,
        end,
        avg: 0,
        min: 0,
        max: 0,
      };
    }

    const bpmValues = data.map((d) => d.heartRate);
    const avg = Number((bpmValues.reduce((a, b) => a + b, 0) / bpmValues.length).toFixed(1));
    const min = Math.min(...bpmValues);
    const max = Math.max(...bpmValues);

    return {
      patientId: id,
      start,
      end,
      avg,
      min,
      max,
    };
  }

  async getAllPatients(): Promise<Patient[]> {
    return this.patientRepo.find();
  }
}
