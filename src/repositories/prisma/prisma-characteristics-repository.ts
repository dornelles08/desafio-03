import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CharacteristicsRepository } from "../characteristics-repository";

export class PrismaCharacteristicsRepository
implements CharacteristicsRepository
{
  async create(data: Prisma.CharacteristicUncheckedCreateInput) {
    const characteristic = await prisma.characteristic.create({ data });

    return characteristic;
  }

  async findByPet(petId: string) {
    const characteristics = await prisma.characteristic.findMany({
      where: { pet_id: petId },
    });

    return characteristics;
  }

  async findMany(characteristicDescription: string) {
    const characteristics = await prisma.characteristic.findMany({
      where: { description: characteristicDescription },
    });

    return characteristics;
  }
}
