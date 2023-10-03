import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { UploadVideoRepository } from "../upload-video-repository";

export class PrismaUploadVideoRepository implements UploadVideoRepository {
  async create(data: Prisma.VideoCreateInput) {
    const video = await prisma.video.create({
      data,
    });

    return video;
  }
}
