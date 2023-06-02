"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import HomePrompts from "../components/HomePrompts";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col min-h-screen">
      <h1 className="heading-text text-center">
        Find the most popular <br />
        <span className="text-blue-600">AI Prompts</span>
      </h1>
      <p className="desc">
        Promptify is a productive AI tool bringing all the best prompt in one
        single place to help you save time and boost productivity.
      </p>

      {session?.user.id ? (
        <HomePrompts />
      ) : (
        <div className="mt-6 mx-auto">
          <p className="text-center my-6">
            <span className="underline">Sign In</span> to explore best and most
            voted AI prompts
          </p>
          <Image
            src="/assets/main-img.png"
            width={"800"}
            height={"800"}
            alt="Main Image"
          />
        </div>
      )}
    </main>
  );
}
