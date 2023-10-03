import { Prisma, Video } from "@prisma/client";

export interface UploadVideoRepository {
  create(data: Prisma.VideoCreateInput): Promise<Video>;
}
