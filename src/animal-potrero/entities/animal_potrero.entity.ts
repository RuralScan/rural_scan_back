import { Animal } from '../../animals/entities/animal.entity';
import { Potrero } from '../../potreros/entities/potrero.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('animal_potrero')
@Unique(['animal', 'potrero', 'entryDate', 'exitDate'])
export class AnimalPotrero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Animal, (animal) => animal.animalPotreros, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'animalId' })
  animal: Animal;

  @Column()
  animalId: string;

  @ManyToOne(() => Potrero, (potrero) => potrero.animalPotreros)
  @JoinColumn({ name: 'potreroId' })
  potrero: Potrero;

  @Column()
  potreroId: string;

  @Column({ type: 'date' })
  entryDate: Date;

  @Column({ type: 'date', nullable: true, default: null })
  exitDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
