import fastify from "fastify";
import fastifyCors from "@fastify/cors";

import { getAllPromptsRoute } from "./routes/get-all-prompts";
import { uploadVideoRoute } from "./routes/upload-video";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import multer from "fastify-multer";

const app = fastify();

app.register(multer.contentParser);

app.register(fastifyCors, {
  origin: "*",
  credentials: true,
  allowedHeaders: "*",
  methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
});

app.register(getAllPromptsRoute);
app.register(uploadVideoRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);

app
  .listen({
    port: Number(process.env.PORT),
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server is running!");
  });
