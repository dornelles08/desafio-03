import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPet } from "./create-pet";
import { getPetDetails } from "./get-pet-details";

export async function petsRoutes(app: FastifyInstance) {
  app.patch("/pets/:petId/adopt", { onRequest: verifyJWT }, () => {});

  app.get("/pets", () => {});
  
  app.post("/pets", { onRequest: verifyJWT }, createPet);
  app.get("/pets/:petId", getPetDetails);
}
