import { FastifyReply, FastifyRequest } from "fastify";
import { makeUploadVideoUseCase } from "../../use-cases/factories/make-upload-video-use-case";
import { MultipartFile } from "@fastify/multipart";

export async function UploadVideoController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const data = (await req.file()) as MultipartFile;

  try {
    const uploadVideoUseCase = makeUploadVideoUseCase();
    const { video } = await uploadVideoUseCase.execute({ data });

    return reply.status(200).send({ video });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: error.message });
  }
}
