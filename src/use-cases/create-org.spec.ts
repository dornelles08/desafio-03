import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { CreateOrgUsecase } from "./create-org";
import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: CreateOrgUsecase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new CreateOrgUsecase(orgsRepository);
  });

  it("should be able to create a org", async () => {
    const { org } = await sut.execute({
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password: "123456",
      whatsapp_number: "79999999999",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should hash org password on create", async () => {
    const password = "123456";
    const { org } = await sut.execute({
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password,
      whatsapp_number: "79999999999",
    });

    const passwordHasHashed = await compare(password, org.password_hash);

    expect(passwordHasHashed).toBe(true);
  });

  it("should not be able to create an org with exists email", async () => {
    await sut.execute({
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password: "123456",
      whatsapp_number: "79999999999",
    });

    await expect(() =>
      sut.execute({
        address: "Rua A, 223",
        email: "org@email.com",
        name: "Org pet",
        password: "123456",
        whatsapp_number: "79999999999",
      })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
