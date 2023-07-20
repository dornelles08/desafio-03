import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async setAdopt(petId: string) {
    const pet = await prisma.pet.update({
      data: {
        adopted_at: new Date(),
      },
      where: {
        id: petId,
      },
    });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: { Characteristic: true },
    });

    return pet;
  }

  async findMany(city: string, characteristics: string[], page: number) {
    const pets = await prisma.pet.findMany({
      where: { city },
      take: 20,
      skip: (page - 1) * 20,
      include: { Characteristic: true },
    });

    if (characteristics.length) {
      return pets.filter((pet) =>
        pet.Characteristic.some((characteristic) =>
          characteristics.includes(characteristic.description)
        )
      );
    }

    return pets;
  }
}
