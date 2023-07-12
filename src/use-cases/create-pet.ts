import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
  species: string;
  age: number;
  city: string;
  org_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    city,
    org_id,
    species,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age,
      city,
      org_id,
      species,
    });

    return { pet };
  }
}
