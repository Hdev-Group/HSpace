import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface BadgesProps {
    level: number;
    isstaff: boolean;
    bugfinder: boolean;
    securitybugfinder: boolean;
    opensourcelead: boolean;
    earlyadopter: boolean;
}

export default function Badges({ level, isstaff, bugfinder, securitybugfinder, opensourcelead, earlyadopter }: BadgesProps) {
    function BugFinderBadge() {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <img src="/badges/bugfinder.png" height={30} width={30} className="min-h-[30px] min-w-[30px]" />
                    </TooltipTrigger>
                    <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                        <div className="dark:border-neutral-950">
                            <p className="text-sm text-white">Bug Finder</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    function StaffBadge() {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <img src="/logo.png" height={30} width={30} className="min-h-[30px] min-w-[30px]" />
                    </TooltipTrigger>
                    <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                        <div className="dark:border-neutral-950">
                            <p className="text-sm text-white">HSpace Staff</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    function SecurityBugFinder() {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <img src="/badges/SecurityAssister.png"  height={30} width={30} className="min-h-[30px] min-w-[30px]" />
                    </TooltipTrigger>
                    <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                        <div className="dark:border-neutral-950">
                            <p className="text-sm text-white">Security Bug Finder</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    function EarlyAdopter() {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <img src="/badges/earlyadopt.png"  height={30} width={30} className="min-h-[30px] min-w-[30px]" />
                    </TooltipTrigger>
                    <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                        <div className="dark:border-neutral-950">
                            <p className="text-sm text-white">Early Adopter</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    function BetaTester() {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <img src="/badges/betatester.png"  height={30} width={30} className="min-h-[30px] min-w-[30px]" />
                    </TooltipTrigger>
                    <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                        <div className="dark:border-neutral-950">
                            <p className="text-sm text-white">Beta Tester</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    function OpenSourceLeader() {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <img src="/badges/OpenSourceChad.png" height={30} width={30} className="min-h-[30px] min-w-[30px]" />
                    </TooltipTrigger>
                    <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                        <div className="dark:border-neutral-950">
                            <p className="text-sm text-white">Open Source Leader</p>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    const [isHovered, setIsHovered] = useState(false);

    // Array to hold badge components based on props
    const badges = [
        isstaff && <StaffBadge key="staff" />,
        securitybugfinder && <SecurityBugFinder key="securitybugfinder" />,
        opensourcelead && <OpenSourceLeader key="opensource" />,
        bugfinder && <BugFinderBadge key="bugfinder" />,
        earlyadopter && <EarlyAdopter key="early" />,
    ].filter(Boolean);

    const totalbadges = badges.length;
    const badgeWidth = Math.min(totalbadges, 2) * 38 + 10; // max 2 badges by default
    const hoveredBadgeWidth = totalbadges * 38 + 10; // full width when hovered

    return (
        <div className="flex flex-row justify-start items-center gap-4 relative">
            <div
                className={`flex border flex-row gap-2 px-2 py-0.5 rounded-md overflow-hidden right-0 top-0 flex-nowrap absolute h-auto bg-neutral-400/20 transition-[width] duration-300 ease-in-out`}
                style={{ width: `${isHovered ? hoveredBadgeWidth : badgeWidth}px` }} 
                onMouseEnter={() => setIsHovered(true)} // Hover effect starts
                onMouseLeave={() => setIsHovered(false)} // Hover effect ends
            >
                {badges}
            </div>
        </div>
    );
}   

export function VerifiedBadge() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <img src="/verifiedhspace.png" height={30} width={30} />
                </TooltipTrigger>
                <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                    <div className="dark:border-neutral-950">
                        <p className="text-sm text-white">Verified</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
