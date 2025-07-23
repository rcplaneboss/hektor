import React from "react";
import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, Phone, Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenuRadioGroupDemo } from "./DropdownMenuRadioGroupDemo";
import { navLinks } from "@/app/constants";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="flex justify-center items-center m-0 p-0 sticky top-0 font-mono z-50">
      <nav className="flex flex-col">
        <div className="bg-p2 flex justify-around items-center w-screen h-8 text-white text-sm">
          <div className="flex justify-between items-center w-full md:w-1/3 gap-3 px-3">
            <div className="flex gap-3">
              <Mail size={20} />
              <p>mhhasanul@gmail.com</p>
            </div>

            <div className="flex gap-3">
              <Phone className="" size={20} />
              <span className="px-3">(12345)67890</span>
            </div>
          </div>
          <div className="flex justify-around items-center w-1/3 max-md:hidden">
            {session && session.user ? (
              <>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button
                    type="submit"
                    variant="link"
                    className="text-white no-underline"
                  >
                    Logout
                    <User size={20} />
                  </Button>
                </form>
                <Link href="/home/pages/wish-list" className="flex gap-3">
                  <p>Wishlist</p>
                  <Heart size={20} />
                </Link>

                <Link href="/home/pages/shopping-cart" className="flex gap-3">
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                </Link>

                <Link href={`/home/pages/${session?.user?.id}`}>
                  <Image
                    src={session.user.image}
                    alt="avatar"
                    width="28"
                    height="28"
                    className="rounded-full"
                  />
                </Link>
              </>
            ) : (
              <>
                <form
                  action={async () => {
                    "use server";
                    await signIn();
                  }}
                >
                  <Button
                    type="submit"
                    variant="link"
                    className="cursor-pointer text-white hover:no-underline"
                  >
                    Login
                    <User size={20} />
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center items-center h-14 bg-white">
          <div className="flex justify-between gap-2 max-md:ms-2 lg:gap-0 lg:justify-around items-center max-md:w-full md:w-4xl lg:w-3/4  max-md:px-8 md:px-0 h-12  text-sm font-sans">
            <div className="flex justify-between gap-6">
              <div className="text-3xl text-p1">
                <span>Hekto</span>
              </div>

              <ul className="flex items-center max-md:hidden gap-0">
                <li className="list-none">
                  <DropdownMenuRadioGroupDemo size={20} />
                </li>

                {navLinks.map(({ title, link }) => (
                  <li className="list-none" key={title}>
                    <div className="nav-hover-btn cursor-pointer text-p1">
                      <Link href={link}>{title}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="">
              <div className="flex justify-center items-center">
                <Input
                  type="text"
                  name="search"
                  className="outline-0 rounded-none focus:border-none focus:outline-none"
                />
                <Button className="bg-p6 rounded-none cursor-pointer">
                  <Search />
                </Button>
              </div>
            </div>

            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
