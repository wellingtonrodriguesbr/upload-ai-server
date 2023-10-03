// import { FastifyReply, FastifyRequest } from "fastify";
// import { makeUploadVideoUseCase } from "../../use-cases/factories/make-upload-video-use-case";
// import { z } from "zod";

// export async function UploadVideoController(
//   req: FastifyRequest,
//   reply: FastifyReply
// ) {
//   const registerBodySchema = z.object({
//     data: z.object({
//       filename: z.string(),
//       path: z.string(),
//       mimetype: z.string(),
//       file: z.instanceof(File),
//     }),
//   });

//   const { data } = registerBodySchema.parse(req.file());

//   try {
//     const uploadVideoUseCase = makeUploadVideoUseCase();
//     await uploadVideoUseCase.execute({ data });

//     return reply.status(200).send();
//   } catch (error) {
//     console.log(error);
//     return reply.status(500).send({ message: error.message });
//   }
// }
