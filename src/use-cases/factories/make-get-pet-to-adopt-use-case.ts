import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { GetPetToAdoptUseCase } from "../get-pet-to-adopt";

export function makeGetPetToAdoptUseCase() {
  const petRepository = new PrismaPetsRepository();
  const orgsRepository = new PrismaOrgsRepository();

  const useCase = new GetPetToAdoptUseCase(petRepository, orgsRepository);

  return useCase;
}
