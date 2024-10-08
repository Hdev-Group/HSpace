"use client";
import { Search, Briefcase, Bell, Menu, Home, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api"
import { title } from "process";

export default function Header(currenttab: any) {
  const { user } = useUser()
  const [searchString, setSearchString] = useState("")
  const [activeTab, setActiveTab] = useState("home")
  const [isExpanded, setIsExpanded] = useState(false)

  // for search back info we will get people, jobs, companies, and posts / hashtags 

  const searchresult = useQuery(api.search.search, { searchString })
  
  useEffect(() => {
    if (searchString.length > 0) {
      setIsExpanded(true);
    
      if (searchresult === undefined) {
        // searchresult is still loading or there is no data yet
        console.log("Query is loading or no results yet");
      } else if (searchresult && Array.isArray(searchresult)) {
        // searchresult is ready and is an array
        console.log(searchresult, "Search results");
      } else {
        console.log("No results found or query failed");
      }
      
    } else {
      const timer = setTimeout(() => setIsExpanded(false), 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [searchString, searchresult]);


  useEffect(() => {
    setActiveTab(currenttab.currenttab)
  }, [currenttab])
  const navItems = [
    { href: "/feed", icon: Home, label: "Home", id: "home", loggedin: false },
    { href: "/friends", icon: Users, label: "Friends", id: "friends", loggedin: true },
    { href: "/jobs", icon: Briefcase, label: "Jobs", id: "jobs", loggedin: false },
  ]

  if (typeof window !== "undefined") {
    window.addEventListener("click", (e) => {
      const input = document.getElementById("clicker")
      if (input && input.contains(e.target as Node)) {
        input.classList.remove("flex")
        input.classList.add("flex-1")
      } else if (input) {
        input.classList.remove("flex-1")
        input.classList.add("flex")
      }
    }, true)
  }

  if (typeof window !== "undefined") {
    window.addEventListener("click", (e) => {
      const input = document.getElementById("clicker")
      const searchheader = document.getElementById("searchheader")
      if (input) {
        if (!input.contains(e.target as Node)) {
          searchString.length > 0 && setIsExpanded(false)
          if (searchheader) {
            (searchheader as HTMLInputElement).value = ""
          }
          input.classList.remove("flex-1")
          input.classList.add("flex")
        }
      }
    }, true)
  }

  return (
    <>
        <ProgressBar
      height="1px"
      color="#89bff8"
      options={{ showSpinner: true }}
      shallowRouting
    />
    <header className="mx-auto fixed backdrop-blur-lg px-14 w-full flex flex-row z-50 border-neutral-800 bg-neutral-800/40 border-b items-center justify-center">
      <div className="container relative flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2 max-w-[36px] max-h-[36px]" href="/feed">
            <Image src="/logo.png" alt="Logo" width={36} height={36} />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems
            .filter((item) => item.loggedin === false || user)
            .map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`transition-colors hover:text-foreground/80  ${
                  activeTab === item.id ? "text-foreground  border-b border-white font-bold" : " text-neutral-300"
                } relative px-2 py-1 rounded-t-lg`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <p className="md:flex hidden">{item.label}</p>
                </div>
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-auto md:w-auto md:flex md:max-w-sm transition-all" id="clicker">
          <form className="relative w-full transition-all">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search" 
              className="pl-8 dark:bg-gray-900/40 border w-full rounded-b-none" 
              type="search" 
              id="searchheader"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)} 
            />
            <div 
              className={`
                transition-all duration-300 ease-in-out
                flex right-0 absolute py-2 w-auto  bg-[#181D27] rounded-lg overflow-hidden  rounded-tr-none
                ${isExpanded 
                  ? "lg:w-[24rem] h-auto opacity-100" 
                  : "w-0 h-0 opacity-0 overflow-hidden"}
              `}
            >
              <div className="flex flex-col space-y-2 w-full">
                {
                  searchresult?.map((item, index) => (
                    <Link href={item._id} key={index} className="flex px-3 justify-between py-1 hover:bg-[#1c212c] w-full flex-row items-center gap-4">
                      <div className="flex items-center flex-row justify-between w-full gap-3">
                        <div className="w-full flex-row flex items-center gap-3">
                          <Search className="h-5 w-5 text-muted-foreground" />
                          <div className="flex flex-col w-full">
                            <p className="text-white">{item.title}</p>
                            <p className="text-muted-foreground text-xs">{item.title}</p>
                          </div>
                        </div>
                        <div className="">
                          <Image src={item._id} alt={item.title} width={35} height={35} className="w-auto  rounded-md" />
                        </div>
                      </div>
                    </Link>
                  )
                  )
                }
              </div>
            </div>
          </form>
          </div>
          {user ? (
                      <nav className="flex items-center">
                      <Button variant="ghost" size="icon" className="mr-2" aria-label="Notifications">
                        <Bell className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="relative rounded-full h-[36px] w-[36px]">
                          <Avatar className="w-[32px] h-[32px]">
                            <AvatarImage src="/1720299869628.jpeg" alt="Harry Campbell" />
                            <AvatarFallback>HC</AvatarFallback>
                          </Avatar>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/profile/${user.id}`}>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </nav>
            ) : (
              <nav className="flex items-center">
                <Link href='/log-in'>
                    <Button variant="ghost" className="mr-2">Log in</Button>
                </Link>
                <Link href='/sign-up'>
                    <Button>Sign up</Button>
                </Link>
              </nav>
                
                )}
        </div>
      </div>
    </header>
    </>
  )
}