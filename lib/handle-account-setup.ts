"use server";

import bcrypt from "bcrypt";
import { updateUser } from "@/drizzle/queries/queries";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";

// Zod schema for form validation
const formSchema = z
  .object({
    phone: z
      .string()
      .min(11, { message: "Minimum phone number length is 11 characters" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Must include uppercase letter" })
      .regex(/[a-z]/, { message: "Must include lowercase letter" })
      .regex(/[0-9]/, { message: "Must include number" })
      .regex(/[^A-Za-z0-9]/, { message: "Must include special character" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export async function handleSubmit(
  prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const id = formData.get("id") as string | null;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const phone = formData.get("phone") as string;

  // Redirect if ID is missing
  if (!id) {
    redirect("/home/pages/sign-in");
  }

  try {
    // Validate input
    formSchema.parse({
      phone,
      password,
      confirmPassword,
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user in DB
    const updatedUser = await updateUser(id!, {
      hashedPassword,
      phone,
    });

    if (!updatedUser) {
      return {
        error: JSON.stringify({
          type: "update-error",
          message: "Failed to update user information.",
        }),
      };
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: JSON.stringify({
          type: "validation-error",
          message: error.issues?.[0]?.message ?? "Invalid input.",
        }),
      };
    }

    return {
      error: JSON.stringify({
        type: "unknown-error",
        message: "An unknown error occurred.",
      }),
    };
    }
    
  // Redirect on success
  redirect("/home/pages/sign-in");
}
