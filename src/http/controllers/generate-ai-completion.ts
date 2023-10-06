import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGenerateAiCompletionUseCase } from "../../use-cases/factories/make-generate-ai-completion";

export async function GenerateAiCompletionController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    videoId: z.string().uuid(),
    prompt: z.string(),
    temperature: z.number().min(0).max(1).default(0.5),
  });

  const { videoId, prompt, temperature } = bodySchema.parse(req.body);

  try {
    const generateAiCompletionUseCase = makeGenerateAiCompletionUseCase();
    await generateAiCompletionUseCase.execute({
      videoId,
      prompt,
      temperature,
      reply,
    });
  } catch (error) {
    console.log(error);
    return reply.status(500).send({ message: error.message });
  }
}
