"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Github, Linkedin, Twitter,Star, Award,UserIcon,CalendarIcon,InfoIcon,Flag, Verified, Edit, MapPin, Calendar, MapPinIcon,Ban, BuildingIcon, Ellipsis } from "lucide-react"
import {ProfileBadges} from "../../../../components/(AppComponents)/badges/badges"
import Header from "../../../../components/(AppComponents)/header/header"
import type { ProjectCard } from "../../../../types/types"
import { VerifiedBadge } from "../../../../components/(AppComponents)/badges/badges"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from "convex/react";
import { EditProfileModal, EditProfileSectionsModal, EditAboutSection} from "../../../../components/(AppComponents)/modals/modals"

export default function ProfilePage({ params }: { params: {userid: string }}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [isModalProfile, setIsModalOpen] = useState(false);
  const [isEditSections, setEditProfileSections] = useState(false);
  const [isEditAbout, setEditAboutSection] = useState(false);
  console.log(isModalProfile)
  const useUsers = useUser();
  const handleClose = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  const handleCloseEditSection = () => {
    setEditProfileSections(false);
    document.body.style.overflow = 'auto';
  };
  const closehandEditAboutSection = () => {
    setEditAboutSection(false);
    document.body.style.overflow = 'auto';
  };
  const urlid = params.userid

  const userinformation = useQuery(api.users.user, { id: urlid });

  useEffect(() => {
    async function fetchAssigneeData() {
      if (urlid) {
        try {
          const response = await fetch(`/api/get-user?userId=${urlid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching assignee data:', error);
          setUserData(null);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchAssigneeData();
  }, [urlid]);

console.log(userinformation)
const UserId = useUsers?.user?.id;
const location = userinformation?.country
const badges = userinformation?.badges
const title = userinformation?.title
const about = userinformation?.about
const topskills = userinformation?.topskills
const github = userinformation?.github
const twitter = userinformation?.twitter
const linkedin = userinformation?.linkedin

const verified = badges?.includes("verified");

  function viewdetails() {
    console.log('Viewing details')
  }
  function EditProfile() {
    setIsModalOpen(true)
  }
  function EditProfileSections(){
    setEditProfileSections(true);
  }
  function EditAbout() {
    setEditAboutSection(true);
  }
  function joinDateCalc() {
    const date = new Date(userData?.userdetails.createdAt);
    return date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
  }
  function ReportUser(userid: string) {
    console.log(`Reporting user ${userid}`)
  }

  return (
    <>
      <head>
        <title>Harry Campbell | HSpace</title>
      </head>
      <body className="w-full bg-gray-100 relative dark:bg-gray-950">
        <Header currenttab="profile" />
        <div className="flex w-full h-auto justify-center items-center flex-col">
          <div className="flex flex-row relative max-w-[900px] mt-10 pb-10 w-full justify-center">
            <main className="flex flex-col w-full overflow-none gap-5 justify-center max-w-[1020px]">
              <section id="#">
              <Card className="w-full mt-8 bg-white dark:bg-gray-800 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src="/placeholder/image_2024-08-17_19-24-08.png"
                      alt="Profile cover"
                      className={`w-full h-62 object-fill rounded-t-lg ${isLoading ? "animate-pulse" : ""}`}
                    />
                    <div className="absolute -bottom-16 left-4 md:left-8">
                      <Avatar className={`h-32 w-32 border-4 border-gray-800 bg-neutral-400 ${isLoading ? "animate-pulse" : ""}`}>
                        <AvatarImage src={userData?.userdetails.imageUrl} alt={`${userData?.userdetails.firstName} ${userData?.userdetails.lastName}`} className={`h-32 w-32`} />
                      </Avatar>
                    </div>
                  </div>
                  <div className="pt-20 px-4 md:px-8 pb-8">
                    <div className="flex md:flex-row flex-col justify-between items-start">
                      <div className="md:pr-12">
                        <p className="text-3xl font-bold flex items-center gap-2">
                        <Dialog>
                        <DialogTrigger asChild>
                          <span className="hover:bg-neutral-500/30  cursor-pointer py-0.5 rounded-md">{userData?.userdetails.firstName} {userData?.userdetails.lastName}</span>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] dark:bg-gray-900">
                          <DialogHeader>
                            <DialogTitle>{userData?.userdetails.firstName} {userData?.userdetails.lastName}</DialogTitle>
                          </DialogHeader>
                          <div className="flex flex-col items-start px-4 space-y-4 pt-4">
                            <Avatar className="h-24 w-24">
                              <AvatarImage src="/1720299869628.jpeg" alt={`${userData?.userdetails.firstName} ${userData?.userdetails.lastName}`} />
                              <AvatarFallback>HC</AvatarFallback>
                            </Avatar>
                            <p className="text-2xl font-bold">{userData?.userdetails.firstName} {userData?.userdetails.lastName}</p>
                          </div>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center space-x-4">
                              <UserIcon className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">Username</p>
                                <p className="text-sm">@{userData?.userdetails.username}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <CalendarIcon className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">Joined</p>
                                <p className="text-sm">{joinDateCalc()}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <InfoIcon className="h-5 w-5 text-gray-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                                <p className="text-sm">Less than 1 month ago</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog> <VerifiedBadge isverified={verified} />
                          </p>
                          <p className="text-muted-foreground text-lg">@{userData?.userdetails.username}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            {
                              location && (
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {location}</span>
                              )
                            }
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined September 2024</span>
                          </div>
                          <p className="mt-4 max-w-xl text-base leading-relaxed">{title}</p>
                          <div className="flex flex-row gap-4 mt-4">
                            <p className="text-blue-600 dark:text-blue-400 font-medium">Followers <span className="font-bold">500+</span></p>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">Friends <span className="font-bold">127</span></p>
                          </div>
                        </div>
                        <div className="flex mt-5 md:mt-[-50px] flex-row md:flex-col gap-4 md:w-auto w-full items-end">
                        {
                          UserId === urlid && <button className="p-1 rounded-full w-auto px-2 py-1.5 bg-neutral-300/20 backdrop-blur-md" onClick={EditProfile}><Edit className="w-5 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all" /></button>
                        }
                        {
                          UserId !== urlid && 
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button>
                                <Ellipsis />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem className="gap-2 hover:bg-red-600/60 cursor-pointer hover:text-red-100" onClick={() => ReportUser(urlid)}><Flag className="w-4 h-4"/>Report</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="gap-2 hover:bg-red-600/60 cursor-pointer hover:text-red-100"><Ban className="w-4 h-4" />Block</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        }
                          <div className="flex flex-row gap-2  items-end justify-end">
                            {
                              UserId !== urlid &&
                              <>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Follow</Button>
                                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20">Message</Button>
                              </>
                            }
                            {
                              UserId === urlid &&
                              <Button variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500" onClick={() => EditProfileSections()}>Edit Sections</Button>
                            }
                          </div>
                          {
                            !badges?.includes("verified") || badges && <ProfileBadges badgetypes={badges} />
                          }
                        </div>
                      </div>
                      <div className="flex gap-4 mt-6">
                        {
                          github && 
                          <a href={github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500" size="icon">
                            <Github className="h-5 w-5" />
                          </Button>
                        </a>
                        }
                        {
                          twitter && 
                        <a href={twitter} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500" size="icon">
                            <Twitter className="h-5 w-5" />
                          </Button>
                        </a>
                          }
                          {
                            linkedin &&
                            <a href={linkedin} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500" size="icon">
                              <Linkedin className="h-5 w-5" />
                            </Button>
                          </a>
                          }
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
              {
                (about || topskills) && 
                <section id="about">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    {
                      about ? (<p className="text-2xl font-semibold">About</p>) : (<p className="text-2xl font-semibold">Top Skills</p> || about && topskills && <p className="text-2xl font-semibold">About</p>)
                    }
                    {
                      UserId === urlid && <button className="p-1 rounded-full  px-2 py-1.5 bg-neutral-300/20 backdrop-blur-md" onClick={EditAbout}><Edit className="w-5 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all" /></button>
                    }
                  </CardHeader>
                  <CardContent>
                    {about &&
                      <>
                        <p className="text-base text-gray-600 dark:text-gray-300">{about}</p>
                        {topskills && <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-4"/>}
                      </>
                    }
                    {topskills && about ? (<h3 className="text-xl font-semibold mb-4">Top Skills</h3>) : null}
                    <div className="flex flex-wrap gap-2">
                      {
                        topskills?.map((skill: string) => (
                          <SkillBadge key={skill} name={skill} />
                        ))
                      }
                    </div>
                  </CardContent>
                </Card>
                </section>
              }
              <section id="work">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <p className="text-2xl font-semibold">Work</p>
                    {
                      UserId === urlid && <button className="p-1 rounded-full  px-2 py-1.5 bg-neutral-300/20 backdrop-blur-md" onClick={EditAbout}><Edit className="w-5 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all" /></button>
                    }
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <JobCard
                        jobtitle="Lead Developer & Founder"
                        company="HDev Group"
                        location="Remote"
                        date="2020 - Present"
                        skills={["React", "TypeScript", "Node.js", "AWS"]}
                        description="Lead a team of developers to build cutting-edge web applications and developer tools. Responsible for project planning, code reviews, and technical architecture."
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>
              <section id="projects">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <p className="text-2xl font-semibold">Projects</p>
                    {
                      UserId === urlid && <button className="p-1 rounded-full  px-2 py-1.5 bg-neutral-300/20 backdrop-blur-md" onClick={EditAbout}><Edit className="w-5 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all" /></button>
                    }
                  </CardHeader>
                  <CardContent>
                    <ProjectShower />
                  </CardContent>
                </Card>
              </section>
              <section id="licenses">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <p className="text-2xl font-semibold">Licenses & Certifications</p>
                      {
                      UserId === urlid && <button className="p-1 rounded-full flex items-center justify-center px-2 py-1.5 bg-neutral-300/20 backdrop-blur-md" onClick={EditAbout}><Edit className="w-5 hover:text-neutral-900 dark:hover:text-neutral-300 transition-all" /></button>
                      }
                    </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <LicensesCard
                        title="Full Stack Developer"
                        issuer="HackerRank"
                        date="2021"
                      />
                      <LicensesCard
                        title="AWS Certified Developer - Associate"
                        issuer="Amazon Web Services"
                        date="2022"
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>
              <section id="hiring">
                <Card className="bg-white dark:bg-gray-800 shadow-md overflow-hidden">
                  <CardHeader className="border-b border-border">
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        <p className="text-2xl font-bold">Harry is Hiring</p>
                      </CardTitle>
                      <Button variant="outline" size="sm">View all jobs</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <JobsCard
                        title="Full Stack Developer"
                        company="HDev Group"
                        location="Remote"
                        date="2 days ago"
                        description="We are looking for a full stack developer to join our team and help us build the next generation of developer tools."
                      />
                      <JobsCard
                        title="UX Designer"
                        company="HDev Group"
                        location="Remote"
                        date="1 week ago"
                        description="Join our design team to create intuitive and beautiful user experiences for our cutting-edge products."
                      />
                    </div>
                  </CardContent>
                </Card>
              </section>
              <section id="reputation">
                <Card className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader>
                    <CardTitle>
                      <p className="text-2xl font-semibold">Reputation</p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <UserReputationCard
                        score={95}
                        name="Harry Campbell"
                      />
                      <div className="w-full h-px bg-gray-200 dark:bg-gray-700"/>
                      <div className="flex flex-col gap-4">
                        <ReviewCard
                          reviewerid="Jane Doe"
                          review="Harry is an exceptional developer. His attention to detail and problem-solving skills are impressive. He helped me build a complex web application, and the result exceeded my expectations."
                          rating={5}
                        />
                        <ReviewCard
                          reviewerid="John Smith"
                          review="Working with Harry was a great experience. He's professional, communicative, and delivers high-quality work on time."
                          rating={4}
                        />
                      </div>
                    </div>  
                  </CardContent>
                </Card>
              </section>
            </main>
          </div>
        </div>
        {
          isModalProfile && <EditProfileModal user={userData} useridentify={params.userid} closeModal={handleClose} />
        }
        {
          isEditSections && <EditProfileSectionsModal closeModal={handleCloseEditSection} />
        }
        {
          isEditAbout && <EditAboutSection closeModal={closehandEditAboutSection} />
        }
      </body>
    </>
  )
}

function ProjectShower() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <ProjectCard 
        title="HSpace"
        description="HSpace is a platform for developers to connect, share their work and apply to jobs in real time."
        link=""
        type="In Progress"
        technology={['Next.js', 'TailwindCSS', 'TypeScript', 'Convex', 'AWS', 'Node.js']}
        image="/placeholder/image_2024-08-17_19-24-08.png"
      />
      <ProjectCard 
        title="HProjects"
        description="A real time project planning and incident managment software for teams."
        link="https://hprojects.hdev.uk"
        type="Completed"
        technology={['Next.js', 'TailwindCSS', 'TypeScript', 'Convex', 'AWS', 'Node.js']}
        image="/placeholder/image_2024-08-17_19-24-08.png"
      />
    </div>
  )
}

function SkillBadge({name}: {name: string}) {
  return (
    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
      {name}
    </Badge>
  )
}

function UserReputationCard({score, name}: {score: number, name: string}) {
  const getReputationColor = (score: number) => {
    if (score <= 20) return 'text-red-500 bg-red-100 dark:bg-red-900'
    if (score <= 50) return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900'
    if (score <= 70) return 'text-green-500 bg-green-100 dark:bg-green-900'
    return 'text-blue-500 bg-blue-100 dark:bg-blue-900'
  }

  const getReputationText = (score: number) => {
    if (score <= 20) return 'Poor'
    if (score <= 50) return 'Average'
    if (score <= 70) return 'Good'
    return 'Excellent'
  }

  return (
    <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <img src="/1720299869628.jpeg" className="w-12 h-12 rounded-full" alt={name} />
        <div>
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Reputation: <span className={`font-bold px-1 py-0.5 rounded-md ${getReputationColor(score)}`}>{getReputationText(score)}</span>
          </p>
        </div>
      </div>
      <Badge className={`${getReputationColor(score)} px-3 py-1 rounded-full text-sm font-bold`}>
        {score}
      </Badge>
    </div>
  )
}

function ProjectCard({ title, description, link, image, technology, type }: ProjectCard) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <Badge className={type === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
            {type}
          </Badge>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technology.map((tech: string) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        {link && (
          <a href={link} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm font-medium">
            Visit Project →
          </a>
        )}
      </div>
    </div>
  )
}

function JobCard({jobtitle, company, date, location, description, skills}: {jobtitle: string, company: string, date: string, location: string, description: string, skills: string[]}) {
  return(
    <div className="flex items-start gap-4">
    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
      <BuildingIcon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
    </div>
    <div>
      <h4 className="font-semibold text-lg">{jobtitle}</h4>
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">{company}</p>
        <span>•</span>
        <p className="text-sm flex-row flex items-center gap-1 text-gray-600 dark:text-gray-300"><MapPin className="w-4" /> {location}</p>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      <div className="w-full h-0.5 border-t border-gray-200 dark:border-gray-700 my-2"/>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <div className="w-full h-0.5 border-t border-gray-200 dark:border-gray-700 my-2"/>
      <div className="flex gap-2 flex-row">
        {skills?.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  </div>
  )
}

function ReviewCard({reviewerid, review, rating}: {reviewerid: string, review: string, rating: number}) {
  return (
    <div className="flex gap-4 pb-4">
      <img src="/placeholder.svg?height=40&width=40" className="w-10 h-10 rounded-full" alt={reviewerid} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold">{reviewerid}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{review}</p>
      </div>
    </div>
  )
}

function LicensesCard({title, issuer, date}: {title: string, issuer: string, date: string}) {
  return (
    <div className="flex items-start gap-4 pb-4">
      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
        <Award className="w-6 h-6 text-blue-600 dark:text-blue-300" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">{issuer}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Issued: {date}</p>
        <Button variant="link" className="mt-2 p-0 h-auto text-blue-600 dark:text-blue-400">View Certificate</Button>
      </div>
    </div>
  )
}
function JobsCard({title, company, location, date, description}: {title: string, company: string, location: string, date: string, description: string}) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200 border-2 border-gray-700 bg-transparent">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-xl mb-1">{title}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BuildingIcon className="w-4 h-4" />
                <span>{company}</span>
                <span>•</span>
                <MapPinIcon className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {date}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Button size="sm" className="w-full">Apply Now</Button>
      </CardFooter>
    </Card>
  )
}