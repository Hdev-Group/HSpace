"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Inter as FontSans } from "next/font/google"
import type { Metadata } from "next";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "@/components/ui/toaster"
import '@/styles/globals.css'
 
import { cn } from "../@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || '';

if (!convexUrl) {
  throw new Error('Missing Convex URL. Check your environment variables.');
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexProvider client={new ConvexReactClient(convexUrl)}>
        <html lang="en" className="dark">
          <head>
            <link rel="icon" href="/favicon.ico" />
            <title>HSpace</title>
            <meta
              name="description"
              content="HSpace. Chat, Jobs, Share. All in one place."
            />
          </head>
          <body
        className={cn(
          "min-h-screen font-sans antialiased overflow-x-hidden m-0",
          fontSans.variable
        )}
      >
        <Toaster />
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}