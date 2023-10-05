import { CreateTranscriptionRepository } from "../repositories/create-transcription-repository";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { toFile } from "openai/uploads";
import { openai } from "../lib/openai";
import { s3 } from "../lib/s3";
import { FileNotFound } from "./errors/file-not-found";
import { FileBodyMissing } from "./errors/file-body-missing";

interface CreateTranscriptionUseCaseRequest {
  videoId: string;
  prompt: string;
}

interface CreateTranscriptionUseCaseResponse {
  transcription: string;
}

export class CreateTranscriptionUseCase {
  constructor(
    private createTranscriptionRepository: CreateTranscriptionRepository
  ) {}

  async execute({
    videoId,
    prompt,
  }: CreateTranscriptionUseCaseRequest): Promise<CreateTranscriptionUseCaseResponse> {
    const video = await this.createTranscriptionRepository.findVideoByid(
      videoId
    );

    const videoPath = video.path;

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: videoPath,
    });

    const file = await s3.send(command);

    if (!file) {
      throw new FileNotFound();
    }

    if (!file.Body) {
      throw new FileBodyMissing();
    }

    const fileByteArray = await file.Body.transformToByteArray();
    const fileFull = await toFile(fileByteArray, "audio.mp3");

    const response = await openai.audio.transcriptions.create({
      file: fileFull,
      model: "whisper-1",
      language: "pt",
      response_format: "json",
      temperature: 0,
      prompt,
    });

    const transcription = response.text;

    await this.createTranscriptionRepository.updateVideoTranscription(
      videoId,
      transcription
    );

    return {
      transcription,
    };
  }
}
