import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navigation = () => {
  const { status } = useSession();

  return (
    <nav className="border-b">
      <div className="relative container mx-auto p-6 ">
        <div className="flex items-center justify-between">
          <div className="items-left">
            <Link href={"/"}>
              <Image
                src="/fun-football-logo-red.png"
                alt=""
                width={200}
                height={0}
              />
            </Link>
          </div>
          <div className="hidden items-center space-x-6 md:flex">
            <div className="space-x-6">
              <Link href="/" className="hover:text-blue-400">
                All Events
              </Link>
              <Link href="/" className="hover:text-blue-400">
                Yogyakarta
              </Link>
              <Link href="/about-us" className="hover:text-blue-400">
                About Us
              </Link>
            </div>
            {status != "authenticated" && (
              <Link
                href="/login"
                className="px-5 py-2 text-white bg-red-700 rounded-full hover:bg-red-500"
              >
                Get Started
              </Link>
            )}
            {status == "authenticated" && (
              <Link href="/account" className="hover:text-blue-400">
                My Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
