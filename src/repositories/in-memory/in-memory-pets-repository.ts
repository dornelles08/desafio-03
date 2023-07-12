import { randomUUID } from "crypto";
import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

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
      .filter((pets) => pets.city === city)
      .slice((page - 1) * 20, page * 20);

    return pets;
  }
}
