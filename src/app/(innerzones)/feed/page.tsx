"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Header from "../../../components/(AppComponents)/header/header"
import LeftSidebar from "../../../components/(AppComponents)/sidebar/leftsidebar"
import { useUser } from "@clerk/clerk-react";

export default function FeedPage() {
  return (
    <>
    <head>
      <title>Feed | HSpace</title>
    </head>
    <body className="w-full bg-gray-100 dark:bg-gray-950">
    <Header currenttab={"home"} />
    <div className="flex w-full h-auto justify-center items-center flex-col ">
    <div className="flex flex-row relative mt-10 max-w-[1530px] w-full justify-between">
        <LeftSidebar />
      <main className="flex-1  flex-row overflow-auto">
        <div className="w-full mx-auto py-8 px-4">
          <MakePost />
          <div className="w-full h-0.5 bg-gray-400/20 mb-6"/>
          {[1, 2, 3, 4, 5].map((post) => (
            <div key={post} className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4 pb-3">
              <div className="flex items-center mb-4">
                <img
                  alt="User avatar"
                  className="rounded-full"
                  height="40"
                  src="/1720299869628.jpeg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Harry Campbell</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                This is a sample post content. It can be much longer and contain more information.
              </p>
              <img
                alt="Post image"
                className="rounded-lg mb-4"
                height="200"
                src="/placeholder/placeholder.png"
                style={{
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                width="400"
              />
              <div className="flex items-center space-x-4 border-t border-gray-400/20 pt-1">
                <Button variant="ghost" size="sm">
                  <ThumbsUpIcon className="mr-2 h-4 w-4" />
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquareIcon className="mr-2 h-4 w-4" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <ShareIcon className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      </div>
    </div>
    </body>
    </>
  )
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function MakePost() {
  return(
  <div className="bg-white dark:bg-gray-800 flex flex-row rounded-lg shadow mb-6 p-4 pb-3">
    <img src="/1720299869628.jpeg" className="rounded-full" height="40" width="40" />
    <Button 
    variant="ghost" 
    className="flex-1 items-start justify-start ml-4 bg-gray-100 dark:bg-gray-700 dark:text-gray-100 rounded-full px-4 py-2"
    >
      <p className="text-gray-300 font-medium text-md">What have you been working on?</p>
    </Button>
  </div>
  )
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}

function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  )
}

