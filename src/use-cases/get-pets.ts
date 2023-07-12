import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface GetPetsUseCaseRequest {
  city: string;
  page: number;
}

interface GetPetsUseCaseResponse {
  pets: Pet[];
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, page);

    return { pets };
  }
}
