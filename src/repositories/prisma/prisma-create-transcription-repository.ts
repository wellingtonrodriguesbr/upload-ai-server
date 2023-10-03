import { prisma } from "../../lib/prisma";
import { CreateTranscriptionRepository } from "../create-transcription-repository";

export class PrismaCreateTranscriptionRepository
  implements CreateTranscriptionRepository
{
  async findVideoByid(id: string) {
    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return video;
  }
  async updateVideoTranscription(videoId: string, transcription: string) {
    const updateVideo = await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
      },
    });

    return updateVideo;
  }
}
