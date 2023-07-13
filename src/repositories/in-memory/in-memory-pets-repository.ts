import { randomUUID } from "crypto";
import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { CharacteristicsRepository } from "../characteristics-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  constructor(private characteristicsRepository: CharacteristicsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      species: data.species,
      age: new Decimal(data.age.toString()),
      city: data.city,
      org_id: data.org_id,
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) return null;

    return pet;
  }

  async findManyByCity(city: string, page: number) {
    const pets = this.items
      .filter((pet) => pet.city === city && !pet.adopted_at)
      .slice((page - 1) * 20, page * 20);

    return pets;
  }

  async findManyByCharacteristics(
    characteristics: string[],
    city: string,
    page: number
  ) {
    const petIds: string[] = [];

    for await (const characteristic of characteristics) {
      const petSpecificIds = (
        await this.characteristicsRepository.findMany(characteristic)
      ).map(({ pet_id }) => pet_id);

      petIds.push(...petSpecificIds);
    }

    const pet = this.items
      .filter((item) => petIds.includes(item.id) && item.city === city)
      .slice((page - 1) * 20, page * 20);

    return pet;
  }
}
