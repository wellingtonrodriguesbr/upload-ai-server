import { OpenAIStream, streamToResponse } from "ai";
import { openai } from "../lib/openai";
import { GenerateAiCompletionRepository } from "../repositories/generate-ai-completion-repository";
import { VideoMissingTranscription } from "./errors/video-missing-transcription";
import { FastifyReply } from "fastify";

interface GenerateAiCompletionUseCaseRequest {
  videoId: string;
  prompt: string;
  temperature: number;
  reply: FastifyReply;
}

export class GenerateAiCompletionUseCase {
  constructor(
    private generateAiCompletionRepository: GenerateAiCompletionRepository
  ) {}

  async execute({
    videoId,
    prompt,
    temperature,
    reply,
  }: GenerateAiCompletionUseCaseRequest) {
    const video = await this.generateAiCompletionRepository.findVideoByid(
      videoId
    );

    if (!video.transcription) {
      throw new VideoMissingTranscription();
    }

    const promptMessage = prompt.replace(
      "{transcription}",
      video.transcription
    );

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      temperature,
      messages: [
        {
          role: "user",
          content: promptMessage,
        },
      ],
      stream: true,
    });

    const stream = OpenAIStream(response);
    streamToResponse(stream, reply.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE",
      },
    });
  }
}
