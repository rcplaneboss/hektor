"use server"

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

export async function providerSignInAction(providerId: string, callbackUrl?: string) {
 
  try {
    await signIn(providerId, {
      redirectTo: callbackUrl ?? "",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect(`../error?error=${error.type}`);
    }
    throw error;
  }
}
