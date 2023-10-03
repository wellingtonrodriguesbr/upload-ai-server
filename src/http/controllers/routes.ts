import { FastifyInstance } from "fastify";
// import { UploadVideoController } from "./upload-video";
import { getAllPromptsController } from "./get-all-prompts";

export async function appRoutes(app: FastifyInstance) {
  // app.post("/videos", UploadVideoController);
  app.get("/prompts", getAllPromptsController);
}
