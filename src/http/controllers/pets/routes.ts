import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPet } from "./create-pet";
import { getPetDetails } from "./get-pet-details";
import { adoptPet } from "./adopt-pet";
import { getPets } from "./get-pets";
import { getPetToAdopt } from "./get-pet-to-adopt";

export async function petsRoutes(app: FastifyInstance) {
  app.patch("/pets/:petId/adopt", { onRequest: verifyJWT }, adoptPet);
  app.post("/pets", { onRequest: verifyJWT }, createPet);

  app.get("/pets/:petId/adopt", getPetToAdopt);

  app.get("/pets", getPets);
  app.get("/pets/:petId", getPetDetails);
}
