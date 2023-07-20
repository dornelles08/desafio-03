import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { AdoptPetUseCase } from "../adopt-pet";

export function makeAdoptPetUseCase() {
  const petRepository = new PrismaPetsRepository();

  const useCase = new AdoptPetUseCase(petRepository);

  return useCase;
}
