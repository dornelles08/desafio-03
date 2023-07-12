import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/orgs").send({
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password: "123456",
      whatsapp_number: "79999999999",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "org@email.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
