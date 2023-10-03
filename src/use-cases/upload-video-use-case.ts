import path from "node:path";
import { randomUUID } from "node:crypto";
import { Video } from "@prisma/client";
import { UploadVideoRepository } from "../repositories/upload-video-repository";
import { MissingFile } from "../use-cases/errors/missing-file";
import { InvalidInputType } from "./errors/invalid-input-type";
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../lib/s3";

interface UploadVideoUseCaseRequest {
  data: {
    filename: string;
    path: string;
    mimetype: string;
    file: File;
  };
}

interface UploadVideoUseCaseResponse {
  video: Video;
}

export class UploadVideoUseCase {
  constructor(private uploadVideoRepository: UploadVideoRepository) {}

  async execute({
    data,
  }: UploadVideoUseCaseRequest): Promise<UploadVideoUseCaseResponse> {
    if (!data) {
      throw new MissingFile();
    }

    console.log(data);

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      throw new InvalidInputType();
    }

    const fileBaseName = path.basename(data.filename, extension);
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;

    try {
      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.BUCKET_NAME,
          Key: fileUploadName,
          ContentType: data.mimetype,
          Body: data.file,
        },
      });

      await upload.done();
    } catch (error) {
      console.log(error);
    }

    const video = await this.uploadVideoRepository.create({
      name: data.filename,
      path: fileUploadName,
    });

    return { video };
  }
}
