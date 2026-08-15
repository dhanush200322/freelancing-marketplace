import { StatItem } from "@/types";

export const dashboardStats: StatItem[] = [
  { label: "Active Proposals", value: "12", icon: "file-text" },
  { label: "Completed Projects", value: "4", icon: "check-circle" },
  { label: "Total Earnings", value: "$12,450", icon: "dollar-sign" },
  { label: "Profile Views", value: "843", icon: "eye" },
];

import { projects } from "./projects";
import { freelancers } from "./freelancers";

export { categories } from "./categories";
export { projects } from "./projects";
export { freelancers } from "./freelancers";
export { proposals } from "./proposals";
export { activities } from "./activity";

export const savedProjects = [projects[0], projects[2]];
export const savedFreelancers = [freelancers[1], freelancers[3]];
