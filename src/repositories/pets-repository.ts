import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findById(id: string): Promise<Pet | null>;
  findMany(
    city: string,
    characteristics: string[],
    page: number
  ): Promise<Pet[]>;
  setAdopt(petId: string): Promise<Pet>;
}
