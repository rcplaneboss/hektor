"use server";
import { signIn } from "@/auth";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../drizzle/queries/queries";


type User = {
  id?: string;
  name: string | null;
  email: string;
  hashedPassword?: string;
  phone?: string | null;
  image: string | null;
  provider?: string | null;
  role?: string | null;
  createdAt?: Date | null | undefined;
  updatedAt?: Date | null | undefined;
};

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must include uppercase letter" })
    .regex(/[a-z]/, { message: "Must include lowercase letter" })
    .regex(/[0-9]/, { message: "Must include number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must include special character" }),
});

export async function handleSignIn(prevState: any, formData: FormData) {
  try {
    // Validate input
    loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: JSON.stringify({
          type: "validation-error",
          message: error.issues?.[0]?.message || "Invalid input.",
        }),
      };
    }
    return {
      error: JSON.stringify({
        type: "validation-error",
        message: "Unknown validation error.",
      }),
    };
  }

  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const userResult  = await getUserByEmail(email);
    const user : User = userResult[0];

    if (!user || userResult.length === 0) {
      return {
        error: JSON.stringify({
          type: "user-not-found",
          message: "User not found.",
        }),
      };
    }

    if (!userResult[0].hashedPassword) {
      return {
        error: JSON.stringify({
          id: userResult[0].id,
          type: "password-not-found",
          message: "You haven't completed your account setup!",
        }),
      };
    }

    const isValid = await bcrypt.compare(password, userResult[0]?.hashedPassword);
    if (!isValid) {
      return {
        error: JSON.stringify({
          type: "invalid-credentials",
          message: "Invalid email or password.",
        }),
      };
    }

    const result = await signIn("credentials", {
      id: user.id, 
      email: user.email,
      name: user.name,
      image: user.image,
      role: user.role,
      redirect: false, // prevent redirect error
      callbackUrl: "/",
    });

    // If sign-in was successful
    if (!result?.error) {
      return { success: true }; //  send signal to client to redirect
    }else{
      console.log(result.error)
    }

    return {
      error: JSON.stringify({
        type: "auth-error",
        message: result?.error || "Authentication failed.",
      }),
    };
  } catch (err) {
    console.error("Sign-in error:", err);
    return {
      error: JSON.stringify({
        type: "server-error",
        message: "An unexpected error occurred.",
      }),
    };
  }
}
