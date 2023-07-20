import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Get Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get pets", async () => {
    await prisma.org.create({
      data: {
        id: "org-1",
        address: "Rua A, 223",
        email: "org@email.com",
        name: "Org pet",
        password_hash: await hash("123456", 6),
        whatsapp_number: "79999999999",
      },
    });

    await prisma.pet.create({
      data: {
        id: "pet-1",
        age: 14,
        city: "Aracaju/Se",
        org_id: "org-1",
        species: "cachorro",
      },
    });

    await prisma.pet.create({
      data: {
        id: "pet-2",
        age: 14,
        city: "Aracaju/Se",
        org_id: "org-1",
        species: "gato",
      },
    });

    await prisma.characteristic.create({
      data: {
        id: "c-2",
        description: "fofo",
        pet_id: "pet-2",
      },
    });

    await prisma.pet.create({
      data: {
        id: "pet-3",
        age: 14,
        city: "Barra dos Coqueiros/Se",
        org_id: "org-1",
        species: "gato",
      },
    });

    const response = await request(app.server)
      .get("/pets")
      .query({
        city: "Aracaju/Se",
        page: 1,
        characteristics: ["fofo"],
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "pet-2" })])
    );
  });
});
