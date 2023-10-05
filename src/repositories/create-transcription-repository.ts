import { Video } from "@prisma/client";

export interface CreateTranscriptionRepository {
  findVideoByid(id: string): Promise<Video>;
  updateVideoTranscription(
    videoId: string,
    transcription: string
  ): Promise<Video>;
}
