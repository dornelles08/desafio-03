import { Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsrepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } });

    return pet;
  }

  async findManyByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: { city },
      take: 20,
      skip: (page - 1) * 20,
    });

    return pets;
  }

  async findManyByCharacteristics(
    characteristics: string[],
    city: string,
    page: number
  ) {
    const pets = await prisma.pet.findMany({
      where: { city },
      take: 20,
      skip: (page - 1) * 20,
      include: { Characteristic: true },
    });

    return pets.filter((pet) =>
      pet.Characteristic.some((characteristic) =>
        characteristics.includes(characteristic.description)
      )
    );
  }
}
