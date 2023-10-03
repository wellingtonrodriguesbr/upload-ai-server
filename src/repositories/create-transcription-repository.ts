import { Video } from "@prisma/client";

export interface CreateTranscriptionRepository {
  findVideoByid(id: string): Promise<Video | Error>;
  updateVideoTranscription(
    videoId: string,
    transcription: string
  ): Promise<Video>;
}
