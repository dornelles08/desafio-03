import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPet } from "./create-pet";
import { getPetDetails } from "./get-pet-details";
import { adoptPet } from "./adopt-pet";

export async function petsRoutes(app: FastifyInstance) {
  app.patch("/pets/:petId/adopt", { onRequest: verifyJWT }, adoptPet);

  app.get("/pets", () => {});

  app.post("/pets", { onRequest: verifyJWT }, createPet);
  app.get("/pets/:petId", getPetDetails);
}
