import { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateTranscriptionUseCase } from "../../use-cases/factories/make-create-transcription";
import { z } from "zod";

export async function CreateTranscriptionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    videoId: z.string().uuid(),
  });

  const { videoId } = paramsSchema.parse(req.params);

  const bodySchema = z.object({
    prompt: z.string(),
  });

  const { prompt } = bodySchema.parse(req.body);

  try {
    const createTranscriptionUseCase = makeCreateTranscriptionUseCase();
    const { transcription } = await createTranscriptionUseCase.execute({
      videoId,
      prompt,
    });

    return reply.status(200).send({ transcription });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: error.message });
  }
}
