import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeAdoptPetUseCase } from "@/use-cases/factories/make-adopt-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function adoptPet(request: FastifyRequest, reply: FastifyReply) {
  const adoptPetParamsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = adoptPetParamsSchema.parse(request.params);

  try {
    const adoptPetUseCase = makeAdoptPetUseCase();

    await adoptPetUseCase.execute({ petId });

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError)
      return reply.status(404).send({ message: error.message });

    throw error;
  }
}
