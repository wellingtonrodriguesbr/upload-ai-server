import { GenerateAiCompletionRepository } from "../generate-ai-completion-repository";
import { prisma } from "../../lib/prisma";

export class PrismaGenerateAiCompletionRepository
  implements GenerateAiCompletionRepository
{
  async findVideoByid(id: string) {
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return video;
  }
}
