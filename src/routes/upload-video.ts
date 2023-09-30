import path from "node:path";
import { randomUUID } from "node:crypto";
import { FastifyInstance, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../lib/s3";
import { upload } from "../lib/multer";

type FileFastifyRequest = FastifyRequest & {
  file?: {
    buffer: Buffer;
    encoding: string;
    fieldname: string;
    mimetype: string;
    originalname: string;
    size: number;
  };
};

export async function uploadVideoRoute(app: FastifyInstance) {
  app.post(
    "/videos",
    { preHandler: upload.single("file") },
    async (req: FileFastifyRequest, reply) => {
      const data = req.file;

      if (!data) {
        return reply.status(400).send({ error: "Missing file input." });
      }

      const extension = path.extname(data.originalname);

      if (extension !== ".mp3") {
        return reply
          .status(400)
          .send({ error: "Invalid input type, please upload a MP3" });
      }

      const fileBaseName = path.basename(data.originalname, extension);
      const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: fileUploadName,
          ContentType: data.mimetype,
          Body: data.buffer,
        })
      );

      const video = await prisma.video.create({
        data: {
          name: data.originalname,
          path: fileUploadName,
        },
      });

      return { video };
    }
  );
}
