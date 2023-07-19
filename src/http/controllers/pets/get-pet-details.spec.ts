import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Get Pet Details (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get a pet details", async () => {
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

    const response = await request(app.server).get("/pets/pet-1").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: "pet-1",
        org_id: "org-1",
        age: "14",
      })
    );
  });
});
