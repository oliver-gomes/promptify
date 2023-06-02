"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { Popover } from "@headlessui/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setupProviders();
  }, []);

  return (
    <div className="flex w-full pt-4 mb-12 flex-col items-center md:flex-row md:justify-between md:px-12">
      <Link href="/">
        <Image src="/assets/logo.png" width={"100"} height={"100"} />
      </Link>

      {/* Popover */}
      {session?.user ? (
        <div className="flex items-center space-x-8">
          <Link href="/create-prompt" className="blue-btn">
            Create Prompt
          </Link>
          <Popover className="relative">
            <Popover.Button>
              <Image
                src={session?.user.image}
                width={"37"}
                height={"37"}
                className="rounded-full"
                alt="Profile Picture"
              />
            </Popover.Button>

            <Popover.Panel className="absolute z-10 popover-nav">
              <div className="flex flex-col py-2 px-3 space-y-2">
                <Link href={`/profile/${session?.user.id}`}>Profile</Link>
                <button onClick={signOut}>Logout</button>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                className="blue-btn"
                key={provider.name}
                onClick={() => signIn(providers.id)}
              >
                Sign In
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default Navbar;
