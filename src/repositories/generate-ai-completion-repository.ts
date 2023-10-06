import { Video } from "@prisma/client";

export interface GenerateAiCompletionRepository {
  findVideoByid(id: string): Promise<Video>;
}
