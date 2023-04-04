import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-black">
      {/* mobile */}
      <div className="container justify-between mx-auto p-6 space-x-5 flex lg:hidden">
        <div className="flex flex-col space-y-2 w-full">
          <a
            href="http://google.com"
            className="text-white hover:text-blue-400"
          >
            All Events
          </a>
          <a
            href="http://google.com"
            className="text-white hover:text-blue-400"
          >
            Yogyakarta
          </a>
          <hr />
          <div className="flex flex-col space-y-5 pt-6">
            <div>
              <Image
                src="/fun-football-logo-white.png"
                alt=""
                width={150}
                height={0}
              />
            </div>
            <p className="text-white">Copyright 2023 All Right Reserved</p>
          </div>
        </div>
      </div>

      {/* desktop */}
      <div className="container mx-auto p-6 hidden lg:flex space-x-12 items-center justify-between">
        <div>
          <Link href={"/"}>
            <Image
              src="/fun-football-logo-white.png"
              alt=""
              width={200}
              height={0}
            />
          </Link>
        </div>
        <div>
          <div className="flex space-x-10">
            <a
              href="http://google.com"
              className="text-white hover:text-blue-400"
            >
              All Events
            </a>
            <a
              href="http://google.com"
              className="text-white hover:text-blue-400"
            >
              Yogyakarta
            </a>
            <p className="text-white">Copyright 2023 All Right Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
