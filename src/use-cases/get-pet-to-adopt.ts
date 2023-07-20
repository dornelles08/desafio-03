import { OrgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetToAdoptUseCaseRequest {
  petId: string;
}

interface GetPetToAdoptUseCaseResponse {
  whatsappLink: string;
}

export class GetPetToAdoptUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository
  ) {}

  async execute({
    petId,
  }: GetPetToAdoptUseCaseRequest): Promise<GetPetToAdoptUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new ResourceNotFoundError();

    const org = await this.orgsRepository.findById(pet.org_id);

    return { whatsappLink: `https://wa.me/+55${org!.whatsapp_number}` };
  }
}
