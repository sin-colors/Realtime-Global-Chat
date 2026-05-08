import z from "zod";

export const messageInputSchema = z.object({
  text: z.string(),
});

export type MessageInputType = z.infer<typeof messageInputSchema>;
