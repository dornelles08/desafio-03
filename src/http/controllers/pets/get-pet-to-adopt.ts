import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetPetToAdoptUseCase } from "@/use-cases/factories/make-get-pet-to-adopt-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetToAdopt(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const adoptPetParamsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = adoptPetParamsSchema.parse(request.params);

  try {
    const getPetToAdoptUseCase = makeGetPetToAdoptUseCase();

    const { whatsappLink } = await getPetToAdoptUseCase.execute({ petId });

    return reply.status(200).send({ whatsappLink });
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(404).send({ message: error.message });

    throw error;
  }
}
