import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { CreateOrgUsecase } from "../create-org";

export function makeCreateOrgUseCase() {
  const orgRepository = new PrismaOrgsRepository();

  const useCase = new CreateOrgUsecase(orgRepository);

  return useCase;
}
