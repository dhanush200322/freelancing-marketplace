export interface Project {
  id: string;
  title: string;
  category: string;
  categoryId: string; // Add categoryId for cleaner URL slugs
  description: string;
  shortDescription: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  clientName: string;
  clientCompany?: string;
  clientAvatar: string;
  skills: string[];
  experienceLevel: "Entry" | "Intermediate" | "Expert";
  proposals: number;
  postedAt: string;
  status: "Open" | "In Progress" | "Completed" | "Closed";
}

export interface Review {
  id: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  text: string;
  date: string;
  projectName: string;
}

export interface Freelancer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  title: string;
  bio: string;
  skills: string[];
  experienceLevel: "Entry" | "Intermediate" | "Expert";
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  completedProjects: number;
  location: string;
  portfolio: PortfolioItem[];
  availability: "Available Now" | "Busy";
  responseTime: string;
  languages: string[];
  memberSince: string;
  reviews: Review[];
  featured?: boolean;
  category: string;
  categoryId: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  projectCount: number;
}

export type ProposalStatus = "Submitted" | "Under Review" | "Accepted" | "Rejected";

export interface Proposal {
  id: string;
  projectId: string;
  freelancerId?: string;
  freelancerName: string;
  freelancerAvatar?: string;
  projectTitle: string;
  coverLetter: string;
  proposedBudget: number;
  estimatedDays: number;
  submittedAt: string;
  status: ProposalStatus;
  skills: string[];
  clientName: string;
  clientCompany?: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  type: "Proposal Submitted" | "Proposal Accepted" | "Proposal Rejected" | "Freelancer Invited" | "Project Posted" | "Project Completed" | "Freelancer Saved" | "Project Saved";
  title: string;
  description: string;
  date: string;
  status?: "Success" | "Pending" | "Failed" | "Info";
  relatedId?: string;
  relatedType?: "Project" | "Proposal" | "Freelancer";
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalProposals: number;
  acceptedProposals: number;
  pendingProposals: number;
  savedProjects: number;
  savedFreelancers: number;
}
