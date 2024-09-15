import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
    return (
        <header className="sticky items-center flex justify-center top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Image src="/logo.png" alt="HSpace Logo" width={36} height={36} />
                        <span className="hidden font-bold sm:inline-block">HSpace</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
                        <Link href="/jobs" className="transition-colors hover:text-foreground/80 text-foreground/60">Jobs</Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        <Button variant="ghost" className="mr-2">Log in</Button>
                        <Button variant="ghost" className="mr-2">Support</Button>
                        <Button>Sign up</Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}