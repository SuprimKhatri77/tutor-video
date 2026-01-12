import z from "zod";

export const createBlogSchema = z.object({
  title: z.string(),
  description: z.string(),
  images: z.array(z.string()).optional(),
});

export const createBlogResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          title: z.array(z.string()).optional(),
          description: z.array(z.string()).optional(),
          images: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
});

export const editBlogSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  blogId: z.string(),
});

export const editBlogResponseSchema = createBlogResponseSchema;

export const deleteBlogSchema = z.object({
  blogId: z.uuid(),
});
export const deleteBlogResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type CreateBlog = z.infer<typeof createBlogSchema>;
export type CreateBlogResponse = z.infer<typeof createBlogResponseSchema>;
export type EditBlog = z.infer<typeof editBlogSchema>;
export type EditBlogResponse = z.infer<typeof editBlogResponseSchema>;
export type DeletBlog = z.infer<typeof deleteBlogSchema>;
export type DeleteBlogResponse = z.infer<typeof deleteBlogResponseSchema>;
