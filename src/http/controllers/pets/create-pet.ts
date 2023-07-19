import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    species: z.string(),
    age: z.number(),
    city: z.string(),
    characteristics: z.array(z.string()),
  });

  const { age, characteristics, city, species } = createPetBodySchema.parse(
    request.body
  );

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({
    age,
    characteristics,
    city,
    org_id: request.user.sub,
    species,
  });

  return reply.status(201).send();
}
