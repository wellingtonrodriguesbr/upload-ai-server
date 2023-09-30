import path from "node:path";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";
import { pipeline } from "node:stream";
import { FastifyInstance } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import { prisma } from "../lib/prisma";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const { ACCOUNT_ID, ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } =
  process.env;

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID!,
    secretAccessKey: SECRET_ACCESS_KEY!,
  },
});

const pump = promisify(pipeline);

export async function uploadVideoRoute(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1_048_576 * 25,
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

    await S3.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileUploadName,
        ContentType: extension,
        Body: data.file,
      })
    );

    // const uploadDestination = path.join(
    //   __dirname,
    //   `../../tmp/${fileUploadName}`
    // );

    // await pump(data.file, fs.createWriteStream(uploadDestination));

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: fileUploadName,
      },
    });

    return { video };
  });
}
