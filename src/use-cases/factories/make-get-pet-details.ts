import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetDetailsUseCase } from "../get-pet-details";

export function makeGetPetDetailsUseCase() {
  const petRepository = new PrismaPetsRepository();

  const useCase = new GetPetDetailsUseCase(petRepository);

  return useCase;
}
