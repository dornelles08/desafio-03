import { PetsRepository } from "@/repositories/pets-repository";
import { CreatePetUseCase } from "./create-pet";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

let petsRepository: PetsRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      age: 14,
      city: "Aracaju/Se",
      org_id: "org-1",
      species: "cachorro",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
