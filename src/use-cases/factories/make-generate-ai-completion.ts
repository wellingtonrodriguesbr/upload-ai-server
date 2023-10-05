import { PrismaGenerateAiCompletionRepository } from "../../repositories/prisma/prisma-generate-ai-completion-repository";
import { GenerateAiCompletionUseCase } from "../../use-cases/generate-ai-completion";

export function makeGenerateAiCompletionUseCase() {
  const generateAiCompletionRepository =
    new PrismaGenerateAiCompletionRepository();
  const generateAiCompletionUseCase = new GenerateAiCompletionUseCase(
    generateAiCompletionRepository
  );

  return generateAiCompletionUseCase;
}
