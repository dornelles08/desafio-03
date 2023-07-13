import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetsByCharacteristcsUseCaseRequest {
  characteristics: string[];
  city: string;
  page: number;
}

interface GetPetsByCharacteristcsUseCaseResponse {
  pets: Pet[];
}

export class GetPetsByCharacteristcsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    characteristics,
    city,
    page,
  }: GetPetsByCharacteristcsUseCaseRequest): Promise<GetPetsByCharacteristcsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics(
      characteristics,
      city,
      page
    );

    return { pets };
  }
}
