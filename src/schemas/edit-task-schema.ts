import { z } from "zod";

export const EditTaskSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});
