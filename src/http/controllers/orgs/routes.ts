import { FastifyInstance } from "fastify";
import { createOrg } from "./create-org";
import { authenticate } from "./authenticate";
import { refresh } from "./refresh";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", createOrg);

  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);
}
