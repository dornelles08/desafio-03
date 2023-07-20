import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id || randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      whatsapp_number: data.whatsapp_number,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }

  async findById(id: string) {
    const org = this.items.find((org) => org.id === id);

    if (!org) return null;

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((org) => org.email === email);

    if (!org) return null;

    return org;
  }
}
