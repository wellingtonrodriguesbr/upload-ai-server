import path from "node:path";
import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../lib/s3";
import fastifyMultipart from "@fastify/multipart";

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25, // 25mb
    },
  });

  app.post("/videos", async (req, reply) => {
    const data = await req.file();

    if (!data) {
      return reply.status(400).send({ error: "Missing file input." });
    }

    const extension = path.extname(data.filename);

    if (extension !== ".mp3") {
      return reply
        .status(400)
        .send({ error: "Invalid input type, please upload a MP3" });
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

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: fileUploadName,
      },
    });

    return { video };
  });
}
