import { z } from "zod";

export type LoginSchemaProps = z.infer<typeof loginSchema>

export const loginSchema = z.object({
	email: z.string().min(1),
	password: z.string().min(1)
})