import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Patient } from './patient.model';

@Entity()
@Unique(['patientId', 'timestamp'])
export class HeartRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  heartRate: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  patient: Patient;

  @Column()
  patientId: number;
}
