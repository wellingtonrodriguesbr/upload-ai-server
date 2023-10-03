import { prisma } from "../../lib/prisma";
import { GetAllPromptsRepository } from "../get-all-prompts-repository";

export class PrismaGetAllPromptsRepository implements GetAllPromptsRepository {
  async findAllPrompts() {
    const prompts = await prisma.prompt.findMany();
    return prompts;
  }
}
