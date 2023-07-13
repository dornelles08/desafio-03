import { Characteristic, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { CharacteristicsRepository } from "../characteristics-repository";

export class InMemoryCharacteristicsRepository
implements CharacteristicsRepository
{
  public items: Characteristic[] = [];

  async create(data: Prisma.CharacteristicUncheckedCreateInput) {
    const characteristic = {
      id: data.id ?? randomUUID(),
      description: data.description,
      pet_id: data.pet_id,
    };

    this.items.push(characteristic);

    return characteristic;
  }

  async findByPet(petId: string) {
    return this.items.filter(
      (characteristic) => characteristic.pet_id === petId
    );
  }

  async findMany(characteristicDescription: string) {
    const temp = this.items.filter((characteristic) => {
      return characteristic.description === characteristicDescription;
    });

    return temp;
  }
}
