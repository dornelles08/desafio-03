import { CharacteristicRepository } from "@/repositories/characteristic-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
  species: string;
  age: number;
  city: string;
  org_id: string;
  characteristics: string[];
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private characteristicRepository: CharacteristicRepository
  ) {}

  async execute({
    age,
    city,
    org_id,
    species,
    characteristics,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      age,
      city,
      org_id,
      species,
    });

    characteristics.forEach(async (characteristic) => {
      await this.characteristicRepository.create({
        description: characteristic,
        pet_id: pet.id,
      });
    });

    
    return { pet };
  }
}
