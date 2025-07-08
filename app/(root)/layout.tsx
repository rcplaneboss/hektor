import type { Metadata } from "next";
import "../globals.css";
import { Josefin_Sans, Lato } from 'next/font/google';
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-siderbar";
import { cookies } from "next/headers";


const josefin_Sans = Josefin_Sans({ 
    subsets: ['latin'], 
    variable: '--font-sans',
    display: 'swap'
})

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const cookieStore = await cookies();
   const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <html lang="en">
      <body className={`${josefin_Sans.variable} ${lato.variable}`}>
        <SidebarProvider defaultOpen={defaultOpen}>
         <main className='font-sans'>
          <AppSidebar />
          </main>
          <main>
            <Navbar />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
