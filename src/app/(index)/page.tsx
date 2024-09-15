"use client"
import Image from "next/image";
import Header from "../../components/(noneAppComponents)/header/indexHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Users, Briefcase } from "lucide-react";


export default function Home() {

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col items-center justify-center">
        <div className="max-w-[1400px] w-full space-y-20">
          <section className="text-center gap-10 flex flex-col mb-23">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
              Welcome to <span className="text-white dark:text-white">HSpace</span>
            </h1>
            <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
              Connect, collaborate, and grow with the world's most innovative developer community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="dark:bg-primary dark:text-primary-foreground">
                Join the Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                Explore Projects
              </Button>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Share Your Work", icon: Code, description: "Showcase your projects and get feedback from peers" },
              { title: "Connect with Developers", icon: Users, description: "Build your network and collaborate on exciting projects" },
              { title: "Find Job Opportunities", icon: Briefcase, description: "Discover and apply to developer jobs that match your skills" },
            ].map((feature, index) => (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="flex gap-3 mb-[-1rem]">
                  <feature.icon className="h-10 w-10 text-primary dark:text-white" />
                  <CardTitle className="dark:text-gray-100">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="dark:text-gray-300">
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </section>
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-start dark:text-gray-100">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((project) => (
                <Card key={project} className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-4">
                    <Image
                      src={`/placeholder/placeholder.png`}
                      alt={`Featured Project ${project}`}
                      width={400}
                      height={200}
                      className="rounded-md object-cover"
                    />
                    <h3 className="mt-4 text-xl font-semibold dark:text-gray-100">Project Title {project}</h3>
                    <p className="text-muted-foreground dark:text-gray-400">by Developer Name</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                View More Projects
              </Button>
            </div>
          </section>
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-start dark:text-gray-100">Latest Job Opportunities</h2>
            <div className="space-y-4">
              {[
                { title: "Senior Frontend Developer", company: "Tech Co", location: "Remote" },
                { title: "Full Stack Engineer", company: "Startup Inc", location: "New York, NY" },
                { title: "DevOps Specialist", company: "Cloud Systems", location: "San Francisco, CA" },
              ].map((job, index) => (
                <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="flex justify-between items-center p-4">
                    <div>
                      <h3 className="font-semibold dark:text-gray-100">{job.title}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">{job.company} • {job.location}</p>
                    </div>
                    <Button variant="outline" size="sm" className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-zinc-800">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                View All Jobs
              </Button>
            </div>
          </section>

          <section className="bg-primary dark:bg-gray-800 text-primary-foreground dark:text-gray-100 rounded-lg p-8 text-start space-y-4">
            <h2 className="text-3xl font-bold">Join HSpace Today</h2>
            <p className="text-xl max-w-2xl  dark:text-gray-300">
              Connect with fellow developers, showcase your projects, and find your next career opportunity.
            </p>
            <Button size="lg" variant="secondary" className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
}