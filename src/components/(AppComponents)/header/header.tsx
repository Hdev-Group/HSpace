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

export default function Header(currenttab: any) {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState("home")
  useEffect(() => {
    setActiveTab(currenttab.currenttab)
  }, [currenttab])
  const navItems = [
    { href: "/feed", icon: Home, label: "Home", id: "home", loggedin: false },
    { href: "/friends", icon: Users, label: "Friends", id: "friends", loggedin: true },
    { href: "/jobs", icon: Briefcase, label: "Jobs", id: "jobs", loggedin: false },
  ]
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
          <Link className="mr-6 flex items-center space-x-2" href="/feed">
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
                  activeTab === item.id ? "text-foreground  border-b border-white" : " text-neutral-300"
                } relative px-2 py-1 rounded-t-lg`}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
                {activeTab === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full md:w-auto md:flex-1 md:max-w-sm">
            <form className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8 dark:bg-gray-900/40 border" type="search" />
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
                          <DropdownMenuItem>Profile</DropdownMenuItem>
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