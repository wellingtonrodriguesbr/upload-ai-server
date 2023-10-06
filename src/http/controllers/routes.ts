import { FastifyInstance } from "fastify";
import { UploadVideoController } from "./upload-video";
import { getAllPromptsController } from "./get-all-prompts";
import { CreateTranscriptionController } from "./create-transcription";
import { GenerateAiCompletionController } from "./generate-ai-completion";

export async function appRoutes(app: FastifyInstance) {
  app.post("/videos", UploadVideoController);
  app.post("/videos/:videoId/transcription", CreateTranscriptionController);
  app.post("/ai/generate", GenerateAiCompletionController);
  app.get("/prompts", getAllPromptsController);
}
