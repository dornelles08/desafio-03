import { PetsRepository } from "@/repositories/pets-repository";
import { GetPetDetailsUseCase } from "./get-pet-details";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: PetsRepository;
let sut: GetPetDetailsUseCase;

describe("Get Pet Details", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetDetailsUseCase(petsRepository);
  });

  it("should be able to get details from a pet", async () => {
    const petCreated = await petsRepository.create({
      id: "pet-1",
      age: 14,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
    });

    const { pet } = await sut.execute({ petId: petCreated.id });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.city).toEqual("Aracaju/Se");
  });

  it("shoud not be able to get details pet with wrong id", async () => {
    await expect(() =>
      sut.execute({ petId: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
