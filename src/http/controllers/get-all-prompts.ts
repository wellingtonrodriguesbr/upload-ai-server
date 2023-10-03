import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAllPromptsUseCase } from "../../use-cases/factories/make-get-all-prompts";

export async function getAllPromptsController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const getAllPrompts = makeGetAllPromptsUseCase();
  const { prompts } = await getAllPrompts.execute();

  return reply.status(200).send({ prompts });
}
