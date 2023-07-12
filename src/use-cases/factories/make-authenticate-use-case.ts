import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateUseCase() {
  const orgRepository = new PrismaOrgsRepository();

  const useCase = new AuthenticateUseCase(orgRepository);

  return useCase;
}
