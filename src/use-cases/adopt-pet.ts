import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Pet } from "@prisma/client";

interface AdoptPetUseCaseRequest {
  petId: string;
}

interface AdoptPetUseCaseResponse {
  pet: Pet;
}

export class AdoptPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: AdoptPetUseCaseRequest): Promise<AdoptPetUseCaseResponse> {
    console.log(petId);

    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new ResourceNotFoundError();

    const petUpdated = await this.petsRepository.setAdopt(petId);

    return { pet: petUpdated };
  }
}
