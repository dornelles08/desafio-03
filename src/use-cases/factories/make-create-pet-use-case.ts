import { CreatePetUseCase } from "../create-pet";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaCharacteristicsRepository } from "@/repositories/prisma/prisma-characteristics-repository";

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetsRepository();
  const characteristicsRepository = new PrismaCharacteristicsRepository();

  const useCase = new CreatePetUseCase(
    petRepository,
    characteristicsRepository
  );

  return useCase;
}
