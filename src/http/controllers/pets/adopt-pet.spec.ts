import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrg } from "@/use-cases/utils/test/create-and-authenticate-org";

describe("Adopt a Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to adopt pet", async () => {
    const { token } = await createAndAuthenticateOrg(app);

    const org = await prisma.org.findFirstOrThrow();

    await prisma.pet.create({
      data: {
        id: "pet-1",
        age: 14,
        city: "Aracaju/Se",
        org_id: org.id,
        species: "cachorro",
      },
    });

    const response = await request(app.server)
      .patch("/pets/pet-1/adopt")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    const pet = await prisma.pet.findFirst({ where: { id: "pet-1" } });

    expect(pet!.adopted_at).toBeTruthy();
  });
});
