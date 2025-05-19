import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { HeartRate } from './heartRate.model';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ default: 0 })
  requestCount: number;

  @OneToMany(() => HeartRate, (heartRate) => heartRate.patient)
  heartRates: HeartRate[];
}
