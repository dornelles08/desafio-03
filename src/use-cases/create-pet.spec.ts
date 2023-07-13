import { PetsRepository } from "@/repositories/pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CharacteristicsRepository } from "@/repositories/characteristics-repository";
import { InMemoryCharacteristicsRepository } from "@/repositories/in-memory/in-memory-characteristics-repository";

let petsRepository: PetsRepository;
let characteristcsRepository: CharacteristicsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    characteristcsRepository = new InMemoryCharacteristicsRepository();
    sut = new CreatePetUseCase(petsRepository, characteristcsRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      age: 14,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
      characteristics: ["baixo", "caramelo"],
    });

    expect(pet.id).toEqual(expect.any(String));

    const characteristics = await characteristcsRepository.findByPet(pet.id);

    expect(characteristics).toHaveLength(2);
    expect(characteristics).toEqual([
      expect.objectContaining({ description: "baixo" }),
      expect.objectContaining({ description: "caramelo" }),
    ]);
  });
});
