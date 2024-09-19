"use client"
import Link from "next/link"
import { Code, Users, Calendar, Hash, Cpu, Bookmark } from "lucide-react"
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import {SideBarBadges} from "@/components/(AppComponents)/badges/badges"

export default function LeftSidebar() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  useEffect(() => {
    if (user){
      setIsLoading(false)
    }
  } , [user])

  return (
    <div className={`flex sticky mt-8 top-[59px] z-20 h-full`}>
      <aside className="w-64 md:flex hidden flex-col space-y-6 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 rounded-r-lg rounded-l-sm overflow-hidden shadow-lg">
            <>
              <div className="flex flex-col items-center text-center">
                <Link className="relative flex justify-center w-full" href={`/profile/${user?.id}`}>
                  <div className="w-full h-20 absolute">
                    {
                      isLoading && <div className="animate-pulse w-full h-20 bg-gray-900 rounded-t-lg"></div> ||
                      !isLoading && <img src="/placeholder/image_2024-08-17_19-24-08.png" className="w-full" />
                    }
                  </div>
                  <Avatar className={`w-24 h-24 mt-5 p-1 z-50 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center ${isLoading ? "animate-pulse" : ""}`} >
                        <AvatarFallback className="w-full h-full rounded-full object-cover" />
                        <AvatarImage src={user?.imageUrl} className="w-full h-full  rounded-full object-cover" />
                      </Avatar>
                </Link>
                <div className="px-4 gap-0.5 w-full flex flex-col items-center">
                  <h2 className={`mt-2 text-lg font-bold ${isLoading ? "animate-pulse" : ""}`}>{user?.firstName} {user?.lastName}</h2>
                  <a className="text-sm mt-[-4px] font-semibold text-gray-400" href={`/profile/${user?.id}`}>@{user?.username}</a>
                  <div className="text-sm text-gray-400">
                    {isLoading && <div className="animate-pulse w-[120px] bg-neutral-500/20 rounded-lg  px-5 py-3"></div> || <span>Lead Developer & Founder @ Hdev Group | Full Stack Development | Software Security Engineer</span>}
                  </div>

                </div>
              </div>
              <div className="border-t px-4 border-gray-700 pt-4">
                <p className="text-sm text-start">
                  Commit Streak: <span className="font-bold text-green-400">🔥 28 days</span>
                </p>
              </div>
              <nav>
                <ul className="space-y-2 px-4 items-start flex flex-col justify-start">
                  <li className="w-full">
                    <Link href="#" className="flex items-center w-full space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <Code className="w-5 h-5 " />
                      <span>Code Challenges</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <Users className="w-5 h-5" />
                      <span>Tech Meetups</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <Calendar className="w-5 h-5" />
                      <span>Hackathons</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <Link href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                      <Hash className="w-5 h-5" />
                      <span>Tech Trends</span>
                    </Link>
                  </li>
                </ul>
              </nav>
      
              <div className="border-t px-4 border-gray-700 pt-4">
                <h3 className="font-semibold mb-2">Your Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "Typescript", "AWS"].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
      
              <div className="px-4 pb-4">
                <h3 className="font-semibold mb-2">Quick Links</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="#" className="text-sm hover:text-blue-400 transition-colors flex items-center">
                      <Cpu className="w-4 h-4 mr-2" />
                      Resource Library
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm hover:text-blue-400 transition-colors flex items-center">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Saved Articles
                    </Link>
                  </li>
                </ul>
              </div>
            </>
      </aside>
    </div>
  )

}