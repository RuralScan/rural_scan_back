import { Field } from '../../fields/entities/field.entity';
import { ForageStatus } from '../../common/enums/forage.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalPotrero } from '../../animal-potrero/entities/animal_potrero.entity';

@Entity()
@Unique(['name', 'fieldId'])
export class Potrero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  totalHectares: number;

  @Column('float')
  netHectares: number;

  @Column({
    type: 'enum',
    enum: ForageStatus,
  })
  forageStatus: ForageStatus;

  @Column({ nullable: true })
  observations: string;

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

  @ManyToOne(() => Field)
  @JoinColumn({ name: 'fieldId', referencedColumnName: 'id' })
  field: Field;

  @Column()
  fieldId: string;

  @OneToMany(() => AnimalPotrero, (animalPotrero) => animalPotrero.potrero)
  animalPotreros: AnimalPotrero[];
}
