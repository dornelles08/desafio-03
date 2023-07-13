import { PetsRepository } from "@/repositories/pets-repository";
import { GetPetsUseCase } from "./get-pets";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CharacteristicsRepository } from "@/repositories/characteristics-repository";
import { InMemoryCharacteristicsRepository } from "@/repositories/in-memory/in-memory-characteristics-repository";

let petsRepository: PetsRepository;
let characteristcsRepository: CharacteristicsRepository;
let sut: GetPetsUseCase;

describe("Get Pets Use Case", () => {
  beforeEach(() => {
    characteristcsRepository = new InMemoryCharacteristicsRepository();
    petsRepository = new InMemoryPetsRepository(characteristcsRepository);
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

    const { pets } = await sut.execute({ city: "Aracaju/Se", page: 1 });

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
    const { pets } = await sut.execute({ city: "Aracaju/Se", page: 1 });

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

    const { pets } = await sut.execute({ city: "Aracaju/Se", page: 2 });

    expect(pets).toHaveLength(2);
    expect(pets).toEqual([
      expect.objectContaining({ id: "pet-21" }),
      expect.objectContaining({ id: "pet-22" }),
    ]);
  });
});
