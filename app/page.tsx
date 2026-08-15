import { Hero } from "@/components/home/Hero"
import { Stats } from "@/components/home/Stats"
import { Categories } from "@/components/home/Categories"
import { FeaturedProjects } from "@/components/home/FeaturedProjects"
import { FeaturedFreelancers } from "@/components/home/FeaturedFreelancers"
import { HowItWorks } from "@/components/home/HowItWorks"
import { FinalCTA } from "@/components/home/FinalCTA"

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <FeaturedProjects />
      <FeaturedFreelancers />
      <HowItWorks />
      <FinalCTA />
    </>
  );
}
