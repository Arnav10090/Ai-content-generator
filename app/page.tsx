"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Book, Bot, Settings2, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const features = [
  {
    icon: Bot,
    title: "17+ templates",
    description: "Responsive, and mobile-first project on the web",
  },
  {
    icon: Settings2,
    title: "Customizable",
    description: "Components are easily customized and extendable",
  },
  {
    icon: Book,
    title: "Free to Use",
    description: "Every component and plugin is well documented",
  },
  {
    icon: Zap,
    title: "24/7 Support",
    description: "Contact us 24 hours a day, 7 days a week",
  },
];

export default function Home() {
  const { isSignedIn } = useUser();

  return (
    <div className="landing-page min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border/70 bg-background/90 p-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" width={50} height={50} alt="logo" />
          <span className="text-lg font-semibold text-foreground">AI Content Generator</span>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
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

      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
        {isSignedIn ? (
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-500/15 dark:text-blue-300"
          >
            AI Content Generator Membership - Join Now <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        ) : (
          <SignInButton mode="modal">
            <button
              type="button"
              className="mb-4 inline-flex cursor-pointer items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-500/15 dark:text-blue-300"
            >
              AI Content Generator Membership - Join Now <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </SignInButton>
        )}
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-balance sm:text-6xl">
          AI Content <span className="text-blue-600">Generator</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
        </p>
      </main>

      <section className="px-4 pb-16">
        <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl border border-border/60 bg-card/80 p-6 text-center text-card-foreground shadow-sm backdrop-blur"
            >
              <div className="mb-4 rounded-full bg-blue-500/10 p-4 text-blue-600 dark:text-blue-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="mb-4 text-muted-foreground">{feature.description}</p>
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="cursor-pointer font-semibold text-blue-600 transition-colors hover:text-blue-500 hover:underline dark:text-blue-300 dark:hover:text-blue-200"
                >
                  Learn more <ArrowRight className="inline-block ml-1 h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="cursor-pointer font-semibold text-blue-600 transition-colors hover:text-blue-500 hover:underline dark:text-blue-300 dark:hover:text-blue-200"
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
