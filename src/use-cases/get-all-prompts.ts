import { Prompt } from "@prisma/client";
import { GetAllPromptsRepository } from "../repositories/get-all-prompts-repository";

interface GetAllPromptsUseCaseResponse {
  prompts: Prompt[];
}

export class GetAllPromptsUseCase {
  constructor(private getAllPromptsRepository: GetAllPromptsRepository) {}

  async execute(): Promise<GetAllPromptsUseCaseResponse> {
    const prompts = await this.getAllPromptsRepository.findAllPrompts();

    return { prompts };
  }
}
