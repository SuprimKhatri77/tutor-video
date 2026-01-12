import z from "zod";

export const signupSchema = z.object({
  name: z.string().nonempty({ error: "Name is required" }),
  email: z.email().nonempty({ error: "Email is required" }),
  password: z.string().nonempty({ error: "Password is required" }),
});

export const signupResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          name: z.array(z.string()).optional(),
          email: z.array(z.string()).optional(),
          password: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
});
export const signinSchema = z.object({
  email: z.email().nonempty({ error: "Email is required" }),
  password: z.string().nonempty({ error: "Password is required" }),
});

export const signinResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          email: z.array(z.string()).optional(),
          password: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
});

export type Signup = z.infer<typeof signupSchema>;
export type Signin = z.infer<typeof signinSchema>;
export type SignupResponse = z.infer<typeof signupResponseSchema>;
export type SigninResponse = z.infer<typeof signinResponseSchema>;
