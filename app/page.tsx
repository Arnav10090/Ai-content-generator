"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Book, Bot, Settings2, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const features = [
  {
    icon: <Bot />,
    title: "25+ templates",
    description: "Responsive, and mobile-first project on the web",
  },
  {
    icon: <Settings2 />,
    title: "Customizable",
    description: "Components are easily customized and extendable",
  },
  {
    icon: <Book />,
    title: "Free to Use",
    description: "Every component and plugin is well documented",
  },
  {
    icon: <Zap />,
    title: "24/7 Support",
    description: "Contact us 24 hours a day, 7 days a week",
  },
];

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="bg-white">
      <header className="p-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" width={50} height={50} alt="logo" />
          <span className="text-lg font-semibold">AI Content Generator</span>
        </div>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="cursor-pointer">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <SignInButton mode="modal">
              <Button variant="outline" className="cursor-pointer">Get Started</Button>
            </SignInButton>
          )}
        </div>
      </header>

      <main className="text-center py-20 px-4">
        <div className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm font-semibold mb-4">
          AI Content Generator Membership - Join Now <ArrowRight className="inline-block ml-1 h-4 w-4" />
        </div>
        <h1 className="text-5xl font-bold">
          AI Content <span className="text-blue-600">Generator</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
        </p>
        {isSignedIn ? (
          <Link href="/dashboard">
            <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg cursor-pointer">
              Go to Dashboard <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg cursor-pointer">
              Get started <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Button>
          </SignInButton>
        )}
      </main>

      <section className="px-4 -mt-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Learn more <ArrowRight className="inline-block ml-1 h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Learn more <ArrowRight className="inline-block ml-1 h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
