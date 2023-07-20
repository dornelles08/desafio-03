import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsUseCase } from "../get-pets";

export function makeGetPetsUseCase() {
  const petRepository = new PrismaPetsRepository();

  const useCase = new GetPetsUseCase(petRepository);

  return useCase;
}
