import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
users: defineTable({
  name: v.string(),
  country: v.optional(v.string()),
  postcode: v.optional(v.string()),
  city: v.optional(v.string()),
  badges: v.optional(v.array(v.string())),
  title: v.optional(v.string()),
  about: v.optional(v.string()),
  topskills: v.optional(v.array(v.string())),
  worksid: v.optional(v.array(v.string())),
  projectsid: v.optional(v.array(v.string())),
  certifiationsid: v.optional(v.array(v.string())),
  reputationids: v.optional(v.array(v.string())),
  countryLabel: v.optional(v.string()),
  github: v.optional(v.string()),
  linkedin: v.optional(v.string()),
  twitter: v.optional(v.string()),
  // this the Clerk ID, stored in the subject JWT field
  externalId: v.string(),
}).index("byExternalId", ["externalId"]),
socials: defineTable({
    name: v.string(),
    link: v.string(),
}).index("byName", ["name"]),
work: defineTable({
    jobtitle: v.string(),
    company: v.string(),
    location: v.optional(v.string()),
    startdate: v.string(),
    enddate: v.string(),
    description: v.optional(v.string()),
  }).index("byCompany", ["company"]),
projects: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startdate: v.string(),
    enddate: v.string(),
    technologies: v.optional(v.array(v.string())),
    teamsize: v.optional(v.number()),
    role: v.optional(v.string()),
    responsibilities: v.optional(v.string()),
    link: v.optional(v.string()),
  }).index("byTitle", ["title"]),
certifications: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    date: v.string(),
    link: v.string(),
  }).index("byTitle", ["title"]),
});