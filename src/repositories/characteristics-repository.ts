import { Characteristic, Prisma } from "@prisma/client";

export interface CharacteristicsRepository {
  create(
    data: Prisma.CharacteristicUncheckedCreateInput
  ): Promise<Characteristic>;
  findByPet(petId: string): Promise<Characteristic[]>;
  findMany(characteristicDescription: string): Promise<Characteristic[]>;
}
