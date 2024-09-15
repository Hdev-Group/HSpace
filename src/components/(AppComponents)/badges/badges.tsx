import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

interface BadgesProps {
    level: number;
    isstaff: boolean;
}

export default function Badges({ level, isstaff,  }: BadgesProps){
    // find out how many badges there are
    // if there are 2 badges, render both
    // if there is 1 badge, render that one
    // if there are more than 2 badges, render the first 2 then use a hover effect to show the rest

    return(
        <div className="flex flex-row justify-start items-center gap-4">
            <div className="flex border gap-2 px-2 py-0.5 rounded-md bg-neutral-400/20">
            {isstaff && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <img src="/logo.png" className="h-6 w-6" />
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                            <div className=" dark:border-neutral-950">
                                <p className="text-sm text-white">HSpace Staff</p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}

            </div>
        </div>
    )
}

export function VerifiedBadge(){
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <img src="/verifiedhspace.png" height={30} width={30} />
                </TooltipTrigger>
                <TooltipContent className="dark:bg-black border dark:border-neutral-950">
                    <div className=" dark:border-neutral-950">
                        <p className="text-sm text-white">Verified</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}