"use client";

import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { handleSubmit } from "@/lib/handle-account-setup";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface ErrorObj {
  type?: string;
  message?: string;
}

// Helper to safely parse error
function parseError(error: any): ErrorObj | null {
  if (!error) return null;

  try {
    const parsed = typeof error === "string" ? JSON.parse(error) : error;
    if (parsed && typeof parsed === "object" && parsed.message) {
      return {
        type: parsed.type,
        message: parsed.message,
      };
    }
  } catch {
    return { message: error };
  }

  return null;
}

export default function Page() {
  const [state, formAction] = useFormState(handleSubmit, { error: "" });
  const searchParams = useSearchParams();
  const router = useRouter();

  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (!idParam) {
      router.replace("/home/pages/sign-in");
    } else {
      setId(idParam);
    }
  }, [searchParams, router]);

  const parsedError = parseError(state.error);

  if (!id) return null; // Don't render form if ID isn't ready

  return (
    <section className="flex flex-col gap-2 justify-center items-center h-screen w-screen bg-grey-500">
      <main className="px-8 py-4 bg-grey md:w-2/5 w-xs lg:w-sm shadow-lg overflow-hidden">
        <form className="flex flex-col gap-2" action={formAction}>
          <div className="text-center">
            <h1 className="text-3xl text-black font-sans">
              Complete Account Setup
            </h1>
            <p className="text-sm text-p5 py-3">
              Please complete your account setup in order to login.
            </p>
          </div>
{/* 
          <hr className="h-px bg-gray-300" /> */}

          {/* Hidden ID field */}
          <Input name="id" type="hidden" value={id} />

          {/* Error message */}
          {parsedError?.message && (
            <p className="text-red-500 text-sm mb-2 text-center">
              {parsedError.message}
            </p>
          )}

          <Input
            name="password"
            type="password"
            placeholder="Password e.g. ********"
            id="password"
            className="px-4 py-2 rounded-sm placeholder-gray-300 text-sm font-mono"
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password e.g. ********"
            id="confirmPassword"
            className="px-4 py-2 rounded-sm placeholder-gray-300 text-sm font-mono"
          />
          <Input
            name="phone"
            type="tel"
            placeholder="Phone e.g. 08012345678"
            id="phone"
            className="px-4 py-2 rounded-sm placeholder-gray-300 text-sm font-mono"
          />

          <Input
            name="submit"
            value="Submit"
            type="submit"
            className="w-full bg-p6 text-white rounded-sm px-4 py-2 cursor-pointer font-semibold"
          />
        </form>
      </main>
    </section>
  );
}
