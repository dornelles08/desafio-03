import { PetsRepository } from "@/repositories/pets-repository";
import { GetPetsUseCase } from "./get-pets";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CharacteristicsRepository } from "@/repositories/characteristics-repository";
import { InMemoryCharacteristicsRepository } from "@/repositories/in-memory/in-memory-characteristics-repository";

let petsRepository: PetsRepository;
let characteristicsRepository: CharacteristicsRepository;
let sut: GetPetsUseCase;

describe("Get Pets Use Case", () => {
  beforeEach(() => {
    characteristicsRepository = new InMemoryCharacteristicsRepository();
    petsRepository = new InMemoryPetsRepository(characteristicsRepository);
    sut = new GetPetsUseCase(petsRepository);
  });

  it("should be able get adoptable pets", async () => {
    await petsRepository.create({
      id: "pet-1",
      age: 14,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
    });

    await petsRepository.create({
      id: "pet-2",
      age: 5,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "gato",
      adopted_at: new Date(),
    });

    const { pets } = await sut.execute({
      city: "Aracaju/Se",
      characteristics: [],
      page: 1,
    });

    expect(pets).toHaveLength(1);
    expect(pets).toEqual([expect.objectContaining({ species: "cachorro" })]);
  });

  it("should be able get empty list", async () => {
    await petsRepository.create({
      id: "pet-1",
      age: 14,
      city: "Rio de Janeiro/Rj",
      org_id: "org-1",
      species: "cachorro",
    });
    const { pets } = await sut.execute({
      city: "Aracaju/Se",
      characteristics: [],
      page: 1,
    });

    expect(pets).toHaveLength(0);
  });

  it("should be able get paginateed pets", async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        id: `pet-${i}`,
        age: 14,
        city: "Aracaju/Se",
        org_id: "org-1",
        species: "cachorro",
      });
    }

    const { pets } = await sut.execute({
      city: "Aracaju/Se",
      characteristics: [],
      page: 2,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-21" }),
      expect.objectContaining({ id: "pet-22" }),
    ]);
  });

  it("should be able to get pets by characterists", async () => {
    await petsRepository.create({
      id: "pet-1",
      age: 4,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
    });

    await characteristicsRepository.create({
      id: "c-1",
      description: "fofo",
      pet_id: "pet-1",
    });

    await characteristicsRepository.create({
      id: "c-2",
      description: "peludo",
      pet_id: "pet-1",
    });

    await petsRepository.create({
      id: "pet-2",
      age: 1,
      city: "Rio de Janeiri/Rj",
      org_id: "org-1",
      species: "gato",
    });

    await characteristicsRepository.create({
      id: "c-4",
      description: "peludo",
      pet_id: "pet-2",
    });

    await petsRepository.create({
      id: "pet-3",
      age: 14,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
    });

    await characteristicsRepository.create({
      id: "c-3",
      description: "peludo",
      pet_id: "pet-3",
    });

    const { pets } = await sut.execute({
      characteristics: ["peludo", "fofo"],
      city: "Aracaju/Se",
      page: 1,
    });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-1" }),
      expect.objectContaining({ id: "pet-3" }),
    ]);
  });
});
