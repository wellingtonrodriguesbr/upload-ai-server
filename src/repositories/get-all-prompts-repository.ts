import { Prompt } from "@prisma/client";

export interface GetAllPromptsRepository {
  findAllPrompts(): Promise<Prompt[]>;
}
