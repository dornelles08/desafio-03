import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

interface CreateOrgUseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  whatsapp_number: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUsecase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    address,
    email,
    name,
    password,
    whatsapp_number,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const orgWithSameEmail = await this.orgRepository.findByEmail(email);

    if (orgWithSameEmail) throw new OrgAlreadyExistsError();

    const org = await this.orgRepository.create({
      address,
      email,
      name,
      password_hash,
      whatsapp_number,
    });

    return { org };
  }
}
