import { makeGetPetsUseCase } from "@/use-cases/factories/make-get-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPets(request: FastifyRequest, reply: FastifyReply) {
  const getPetsParamsSchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
    characteristics: z
      .array(z.string())
      .or(z.string())
      .optional()
      .transform((c) => c),
  });

  const { page, city, characteristics } = getPetsParamsSchema.parse(
    request.query
  );

  const getPetsUseCase = makeGetPetsUseCase();

  const { pets } = await getPetsUseCase.execute({
    characteristics: characteristics
      ? characteristics instanceof String
        ? [characteristics]
        : characteristics
      : [],
    city,
    page,
  });

  return reply.status(200).send({ pets });
}
