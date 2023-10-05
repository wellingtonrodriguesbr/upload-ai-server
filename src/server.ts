import "dotenv/config";

import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { createTranscriptionRoute } from "./routes/create-transcription";
import { generateAiCompletionRoute } from "./routes/generate-ai-completion";
import { uploadVideoRoute } from "./routes/upload-video";
import { appRoutes } from "./http/controllers/routes";

const app = fastify();

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1_048_576 * 25, // 25mb
    files: 1,
  },
});

app.register(fastifyCors, {
  origin: "*",
  credentials: true,
  allowedHeaders: "*",
  methods: ["GET", "OPTIONS", "PATCH", "DELETE", "POST", "PUT"],
});

app.register(appRoutes);
// app.register(uploadVideoRoute);
// app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);

app
  .listen({
    port: Number(process.env.PORT),
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("HTTP server is running!");
  });
