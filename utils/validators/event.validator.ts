import z from "zod";

export const createEventInputSchema = z.object({
  title: z.string().min(1, { error: "Event title is required." }),
  body: z.string().min(5, { error: "Event description is required." }),
  eventDate: z.date().optional(),
});
export const editEventInputSchema = z.object({
  title: z.string().min(1, { error: "Event title is required." }),
  body: z.string().min(5, { error: "Event description is required." }),
  eventDate: z.date().optional(),
  id: z.uuid().nonempty(),
});

export const deleteEventInputSchema = z.object({
  eventId: z.uuid().nonempty(),
});

export const createEventResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          title: z.array(z.string()).optional(),
          body: z.array(z.string()).optional(),
          eventDate: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),

  data: z
    .object({
      title: z.string().min(1, { error: "Event title is required." }),
      body: z.string().min(5, { error: "Event description is required." }),
      eventDate: z.date().nullable(),
      id: z.uuid(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
    .optional(),
});
export const editEventResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          title: z.array(z.string()).optional(),
          body: z.array(z.string()).optional(),
          eventDate: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
});

export const deleteEventResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type CreateEventInput = z.infer<typeof createEventInputSchema>;
export type EditEventInput = z.infer<typeof editEventInputSchema>;
export type DeleteEventInput = z.infer<typeof deleteEventInputSchema>;
export type DeleteEventResponse = z.infer<typeof deleteEventResponseSchema>;
export type CreateEventResponse = z.infer<typeof createEventResponseSchema>;
export type EditEventResponse = z.infer<typeof editEventResponseSchema>;
