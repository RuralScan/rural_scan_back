import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalPotrero } from './entities/animal_potrero.entity';
import { Repository } from 'typeorm';
import { MoveAnimalsDto } from './dto/create-animal-potrero.dto';
// import { Animal } from '../animals/entities/animal.entity';
// import { Potrero } from '../potreros/entities/potrero.entity';

@Injectable()
export class AnimalPotreroService {
  constructor(
    @InjectRepository(AnimalPotrero)
    private readonly animalPotreroRepository: Repository<AnimalPotrero>,
  ) {}

  async moveAnimals({ animalsId, potreroId, entryDate }: MoveAnimalsDto) {
    const entry = entryDate || new Date();

    for (const animalId of animalsId) {
      // Actualizar el registro actual del animal con fecha de egreso

      const existingAnimal = await this.animalPotreroRepository.findOne({
        where: { animalId, exitDate: null },
      });

      if (existingAnimal) {
        await this.animalPotreroRepository.update(
          { animalId },
          { exitDate: entry },
        );
      }

      const newAnimalPotrero = this.animalPotreroRepository.create({
        animalId,
        potreroId,
        entryDate: entry,
        exitDate: null,
      });

      await this.animalPotreroRepository.save(newAnimalPotrero);
    }
  }

  async getAnimalMovements(animalId: string) {
    return await this.animalPotreroRepository.find({
      where: { animalId },
      order: { entryDate: 'ASC' },
    });
  }
}