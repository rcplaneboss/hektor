"use client";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { handleSignIn } from "../lib/handle-signin-action";
import { providerSignInAction } from "../lib/provider-signin-action";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface Provider {
  id: string;
  name: string;
}

interface ErrorObj {
  id?: string;
  type?: string;
  message?: string;
}

function parseError(error: any): ErrorObj | null {
  if (!error) return null;
  try {
    const parsed = typeof error === "string" ? JSON.parse(error) : error;
    if (parsed && typeof parsed === "object" && parsed.message) {
      return {
        id: parsed.id,
        type: parsed.type,
        message: parsed.message,
      };
    }
  } catch {
    return { message: error };
  }
  return null;
}

export default function ClientSignInForm({
  searchParams,
  providerMap,
}: {
  searchParams: { callbackUrl?: string };
  providerMap: Record<string, Provider>;
}) {
  const [togglePasswordVisibility, setTogglePasswordVisibility] =
    useState(false);
  const [state, formAction] = useFormState(handleSignIn, {
    error: undefined,
    success: false,
  });
  const [redirectCount, setRedirectCount] = useState(5);
  const parsedError = parseError(state.error);
  const modalRef = useRef<HTMLDivElement>(null);

  // Persist input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/"); // safe client-side redirect
    }
  }, [state.success, router]);

  // Animate modal with GSAP
  useEffect(() => {
    if (parsedError?.type === "password-not-found" && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [parsedError?.type]);

  // Countdown timer
  useEffect(() => {
    if (parsedError?.type === "password-not-found") {
      const interval = setInterval(() => {
        setRedirectCount((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [parsedError?.type]);

  // Redirect at 0
  useEffect(() => {
    if (redirectCount === 0 && parsedError?.type === "password-not-found") {
      redirect(`/home/pages/complete-account-setup?id=${parsedError.id}`);
    }
  }, [redirectCount, parsedError?.type]);

  const handleManualRedirect = () => {
    redirect(`/home/pages/complete-account-setup?id=${parsedError?.id}`);
  };

  // Reset password field on error
  useEffect(() => {
    if (state.error) {
      setPassword("");
    }
  }, [state.error]);

  return (
    <section className="px-8 py-4 bg-grey md:w-2/5 w-xs lg:w-sm shadow-lg overflow-hidden relative">
      <form
        action={async (formData) => {
          // Set input values before submitting
          setEmail(formData.get("email") as string);
          setPassword(formData.get("password") as string);
          await formAction(formData);
        }}
        className="flex flex-col justify-center items-center mb-4"
      >
        <div className="font-sans text-2xl p1 text-center pb-3">
          <p>Login</p>
          <small className="text-p5 text-sm">
            Please login using account detail below.
          </small>

          {parsedError?.message && (
            <div className="text-red-500 text-sm mt-2">
              {parsedError.message}
            </div>
          )}
        </div>

        <input
          name="email"
          id="email"
          placeholder="Email e.g. dhikrullahmuhdjamiu@gmail.com"
          className="py-2 px-4 rounded-sm placeholder-gray-300 text-sm font-mono border-[1px] outline-none shadow-none focus:shadow-sm focus:outline-none w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <div className="px-4 py-0 rounded-sm my-3 text-sm font-mono flex items-center justify-between w-full border-[1px] border-gray-300 group opacity-80">
          <input
            name="password"
            type={togglePasswordVisibility ? "text" : "password"}
            id="password"
            placeholder="Password e.g. ********"
            className="py-2 rounded-sm placeholder-gray-300 text-sm font-mono border-none shadow-none focus:border-none focus:outline-none focus:bg-none w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div
            className="cursor-pointer"
            onClick={() =>
              setTogglePasswordVisibility(!togglePasswordVisibility)
            }
          >
            {togglePasswordVisibility ? <EyeIcon /> : <EyeClosedIcon />}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-p6 rounded-sm px-4 py-2 cursor-pointer text-white font-sans transition-all duration-500"
        >
          Sign In
        </Button>
      </form>

      <div className="flex items-center w-full gap-8">
        <hr className="w-full block bg-blue-500 h-[0.5px]" />
        <span className="font-sans text-gray-400 text-sm">or</span>
        <hr className="w-full block bg-blue-500 h-[0.5px]" />
      </div>

      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            await providerSignInAction(provider.id, searchParams?.callbackUrl);
          }}
          className="mt-4"
        >
          <Button
            type="submit"
            className="bg-p2 px-2 py-2 rounded-sm font-sans w-full text-white cursor-pointer transition-all duration-500"
          >
            <span>Sign in with {provider.name}</span>
          </Button>
        </form>
      ))}

      {/*  GSAP Modal */}
      {parsedError?.type === "password-not-found" && (
        <div
          ref={modalRef}
          className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-2 text-yellow-600">
              Incomplete Account Setup
            </h2>
            <p className="text-gray-700 mb-4">
              Redirecting in <strong>{redirectCount}</strong> second
              {redirectCount !== 1 ? "s" : ""}.
            </p>
            <Button
              onClick={handleManualRedirect}
              className="bg-p6 text-white rounded-sm w-full"
            >
              Complete Setup Now
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
// This component handles the client-side sign-in form, including validation, error handling, and provider sign-in options.
// It uses GSAP for animations and Next.js's useFormState for form handling.