import { Proposal } from "@/types";

export const proposals: Proposal[] = [
  {
    id: "prop-1",
    projectId: "proj-1",
    freelancerId: "free-1",
    freelancerName: "Elena Rodriguez",
    freelancerAvatar: "https://i.pravatar.cc/150?u=elena",
    projectTitle: "E-commerce Website Redesign",
    coverLetter: "I have reviewed your requirements for the e-commerce redesign. With over 6 years of experience in Next.js and e-commerce platforms, I can deliver a high-performing, accessible, and conversion-optimized website.",
    proposedBudget: 4500,
    estimatedDays: 14,
    submittedAt: "2023-11-01T10:00:00Z",
    status: "Under Review",
    skills: ["React", "Next.js", "Tailwind CSS"],
    clientName: "TechNova Solutions",
    clientCompany: "Retail"
  },
  {
    id: "prop-2",
    projectId: "proj-2",
    freelancerId: "free-2",
    freelancerName: "David Chen",
    freelancerAvatar: "https://i.pravatar.cc/150?u=david",
    projectTitle: "Mobile App UI/UX Design",
    coverLetter: "I specialize in clean, user-centric mobile interfaces. I would love to tackle the UI/UX design for your new app. Attached is my portfolio showcasing similar successful projects.",
    proposedBudget: 2500,
    estimatedDays: 10,
    submittedAt: "2023-11-03T14:30:00Z",
    status: "Submitted",
    skills: ["UI/UX Design", "Figma"],
    clientName: "Alex Morgan",
    clientCompany: "Startup Inc."
  },
  {
    id: "prop-3",
    projectId: "proj-3",
    freelancerId: "free-3",
    freelancerName: "Sarah Johnson",
    freelancerAvatar: "https://i.pravatar.cc/150?u=sarah",
    projectTitle: "Smart Contract Development",
    coverLetter: "I am an expert in Solidity and Web3. I have successfully audited and deployed over 20 smart contracts. I can ensure your decentralized application is secure and optimized.",
    proposedBudget: 6000,
    estimatedDays: 20,
    submittedAt: "2023-10-25T09:15:00Z",
    status: "Accepted",
    skills: ["Solidity", "Web3.js"],
    clientName: "DeFi Labs",
    clientCompany: "Finance"
  },
  {
    id: "prop-4",
    projectId: "proj-4",
    freelancerId: "free-1",
    freelancerName: "Elena Rodriguez",
    freelancerAvatar: "https://i.pravatar.cc/150?u=elena",
    projectTitle: "Full-Stack SaaS Platform",
    coverLetter: "Unfortunately, I am not able to take on this project full-time right now, but I have submitted a reduced scope proposal if you are open to a phased approach.",
    proposedBudget: 8000,
    estimatedDays: 30,
    submittedAt: "2023-10-10T11:20:00Z",
    status: "Rejected",
    skills: ["React", "Node.js", "PostgreSQL"],
    clientName: "CloudTech",
    clientCompany: "Software"
  }
];
