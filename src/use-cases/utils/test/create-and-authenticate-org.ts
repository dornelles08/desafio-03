import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      address: "Rua A, 223",
      email: "org@email.com",
      name: "Org pet",
      password_hash: await hash("123456", 6),
      whatsapp_number: "79999999999",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "org@email.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
