import { providerMap } from "@/auth"; // server-side only
import ClientSignInForm from "@/components/ClientSignInForm";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  return (
    <main className="flex justify-center items-center h-screen w-screen bg-grey-500">
      <ClientSignInForm searchParams={searchParams} providerMap={providerMap} />
    </main>
  );
}
