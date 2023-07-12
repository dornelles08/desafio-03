import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Create Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a org", async () => {
    const response = await request(app.server).post("/orgs").send({
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password: "123456",
      whatsapp_number: "79999999999",
    });

    expect(response.statusCode).toEqual(201);
  });
});
