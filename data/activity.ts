import { ActivityItem } from "@/types";

export const activities: ActivityItem[] = [
  {
    id: "act-1",
    type: "Proposal Submitted",
    title: "Proposal Submitted",
    description: "You submitted a proposal for E-commerce Website Redesign.",
    date: "2023-11-01T10:00:00Z",
    status: "Pending",
    relatedId: "proj-1",
    relatedType: "Project"
  },
  {
    id: "act-2",
    type: "Proposal Accepted",
    title: "Proposal Accepted",
    description: "Your proposal for Smart Contract Development was accepted by DeFi Labs.",
    date: "2023-10-25T09:15:00Z",
    status: "Success",
    relatedId: "proj-3",
    relatedType: "Project"
  },
  {
    id: "act-3",
    type: "Freelancer Invited",
    title: "Freelancer Invited",
    description: "You invited David Chen to Mobile App UI/UX Design.",
    date: "2023-10-20T14:30:00Z",
    status: "Info",
    relatedId: "free-2",
    relatedType: "Freelancer"
  },
  {
    id: "act-4",
    type: "Project Posted",
    title: "Project Posted",
    description: "You posted a new project: Mobile App UI/UX Design.",
    date: "2023-10-18T08:00:00Z",
    status: "Success",
    relatedId: "proj-2",
    relatedType: "Project"
  },
  {
    id: "act-5",
    type: "Proposal Rejected",
    title: "Proposal Rejected",
    description: "Your proposal for Full-Stack SaaS Platform was rejected.",
    date: "2023-10-10T11:20:00Z",
    status: "Failed",
    relatedId: "proj-4",
    relatedType: "Project"
  },
  {
    id: "act-6",
    type: "Project Saved",
    title: "Project Saved",
    description: "You saved Full-Stack SaaS Platform to your saved projects.",
    date: "2023-10-05T16:45:00Z",
    status: "Info",
    relatedId: "proj-4",
    relatedType: "Project"
  },
  {
    id: "act-7",
    type: "Freelancer Saved",
    title: "Freelancer Saved",
    description: "You saved Sarah Johnson to your saved freelancers.",
    date: "2023-10-02T09:30:00Z",
    status: "Info",
    relatedId: "free-3",
    relatedType: "Freelancer"
  }
];
