import { PetsRepository } from "@/repositories/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { CharacteristicsRepository } from "@/repositories/characteristics-repository";
import { InMemoryCharacteristicsRepository } from "@/repositories/in-memory/in-memory-characteristics-repository";
import { AdoptPetUseCase } from "./adopt-pet";

let petsRepository: PetsRepository;
let characteristcsRepository: CharacteristicsRepository;
let sut: AdoptPetUseCase;

describe("Set Pet as Adopt", () => {
  beforeEach(() => {
    characteristcsRepository = new InMemoryCharacteristicsRepository();
    petsRepository = new InMemoryPetsRepository(characteristcsRepository);
    sut = new AdoptPetUseCase(petsRepository);
  });

  it("should be able to set a pet as adopt", async () => {
    const petCreated = await petsRepository.create({
      id: "pet-1",
      age: 14,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
    });

    await sut.execute({ petId: petCreated.id });

    const pet = await petsRepository.findById(petCreated.id);

    expect(pet?.adopted_at).toBeInstanceOf(Date);
  });
});
