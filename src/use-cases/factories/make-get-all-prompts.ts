import { PrismaGetAllPromptsRepository } from "../../repositories/prisma/prisma-get-all-prompts-repository";
import { GetAllPromptsUseCase } from "../get-all-prompts";

export function makeGetAllPromptsUseCase() {
  const getAllPromptsRepository = new PrismaGetAllPromptsRepository();
  const getAllPromptsUseCase = new GetAllPromptsUseCase(
    getAllPromptsRepository
  );

  return getAllPromptsUseCase;
}
