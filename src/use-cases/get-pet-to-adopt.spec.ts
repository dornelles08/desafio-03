import { PetsRepository } from "@/repositories/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CharacteristicsRepository } from "@/repositories/characteristics-repository";
import { InMemoryCharacteristicsRepository } from "@/repositories/in-memory/in-memory-characteristics-repository";
import { GetPetToAdoptUseCase } from "./get-pet-to-adopt";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";

let petsRepository: PetsRepository;
let characteristcsRepository: CharacteristicsRepository;
let orgsRepository: OrgsRepository;
let sut: GetPetToAdoptUseCase;

describe("Get Pet Details", () => {
  beforeEach(() => {
    characteristcsRepository = new InMemoryCharacteristicsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(characteristcsRepository);
    sut = new GetPetToAdoptUseCase(petsRepository, orgsRepository);
  });

  it("should be able to get pet to be adopt", async () => {
    await orgsRepository.create({
      id: "org-1",
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password_hash: await hash("123456", 6),
      whatsapp_number: "79999999999",
    });

    const petCreated = await petsRepository.create({
      id: "pet-1",
      age: 14,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
    });

    const { whatsappLink } = await sut.execute({ petId: petCreated.id });

    expect(whatsappLink).toEqual(expect.any(String));
  });

  it("should not be able to get pet to adopt", async () => {
    await expect(() =>
      sut.execute({ petId: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
