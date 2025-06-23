import { redirect } from "next/navigation";
import { signIn, auth, providerMap } from "@/auth";
import { AuthError } from "next-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage(searchParams: {
  callbackUrl: string | undefined;
}) {
  return (
    <main className="flex flex-col gap-2 justify-center items-center h-screen w-screen bg-grey-500 ">
      <section className="px-8 py-4  bg-grey md:w-2/5 w-xs lg:w-sm shadow-lg overflow-hidden">
        <form
          action={async (formData) => {
            "use server";
            try {
              await signIn("credentials", formData);
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
          className="flex flex-col justify-center items-center mb-4"
        >
          <div className="font-sans text-2xl p1 text-center">
            <p>Login</p>
            <small className="text-gray-300 text-sm">
              Please login using account detail bellow.
            </small>
          </div>

          <Input
            name="email"
            id="email"
            placeholder="Enter email"
            className="px-4 py-2 rounded-sm my-3 placeholder-gray-300 text-sm font-mono"
          />

          <Input
            name="password"
            id="password"
            placeholder="Enter a strong password"
            className="px-4 py-2 rounded-sm  my-3 placeholder-gray-300 text-sm  font-mono"
          />

          <Button
            type="submit"
            value="Sign In"
            className="w-full bg-p6 rounded-sm
          px-4 py-2 cursor-pointer text-white font-sans transition-all duration-500"
          >
            Sign In
          </Button>
        </form>
        <div className="flex items-center w-full gap-8">
          <hr className=" w-full block bg-blue-500 h-[0.5]" />
          <span className="font-sans text-gray-400 text-sm">Or</span>
          <hr className=" w-full block bg-blue-500 h-[0.5px]" />
        </div>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: searchParams?.callbackUrl ?? "",
                });
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }

                // Otherwise if a redirects happens Next.js can handle it
                // so you can just re-thrown the error and let Next.js handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error;
              }
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
      </section>
    </main>
  );
}
