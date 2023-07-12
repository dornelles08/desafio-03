import { OrgsRepository } from "@/repositories/orgs-repository";
import { AuthenticateUseCase } from "./authenticate";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgRepository: OrgsRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateUseCase(orgRepository);
  });

  it("should be able to authenticate", async () => {
    await orgRepository.create({
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password_hash: await hash("123456", 6),
      whatsapp_number: "79999999999",
    });

    const { org } = await sut.execute({
      email: "org@email.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "org@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await orgRepository.create({
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password_hash: await hash("123456", 6),
      whatsapp_number: "79999999999",
    });

    await expect(() =>
      sut.execute({
        email: "org@email.com",
        password: "123456678",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
