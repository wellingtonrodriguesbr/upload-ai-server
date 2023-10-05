import { PrismaCreateTranscriptionRepository } from "../../repositories/prisma/prisma-create-transcription-repository";
import { CreateTranscriptionUseCase } from "../../use-cases/create-transcription";

export function makeCreateTranscriptionUseCase() {
  const createTranscriptionRepository =
    new PrismaCreateTranscriptionRepository();
  const createTranscriptionUseCase = new CreateTranscriptionUseCase(
    createTranscriptionRepository
  );

  return createTranscriptionUseCase;
}
