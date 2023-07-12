import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeCreateOrgUseCase } from "@/use-cases/factories/make-create-org-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    whatsapp_number: z.string(),
  });

  const { address, email, name, password, whatsapp_number } =
    createOrgBodySchema.parse(request.body);

  try {
    const createOrgUseCase = makeCreateOrgUseCase();

    await createOrgUseCase.execute({
      address,
      email,
      name,
      password,
      whatsapp_number,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError)
      return reply.status(409).send({ message: error.message });

    throw error;
  }
}
