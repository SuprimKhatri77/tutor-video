import z from "zod";

export const contactUsInputSchema = z.object({
  name: z.string().trim().nonempty(),
  subject: z.string().trim().nonempty(),
  message: z.string().trim().nonempty(),
});

export const contactUsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      name: z.array(z.string()).optional(),
      subject: z.array(z.string()).optional(),
      message: z.array(z.string()).optional(),
    })
    .optional(),
});

export type ContactUsInput = z.infer<typeof contactUsInputSchema>;
export type ContactUsResponse = z.infer<typeof contactUsResponseSchema>;
