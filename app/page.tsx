import Hero from "@/features/hero";
import Work from "@/features/work";
import Portfolio from "@/features/portfolio";
import Certifications from "@/features/skills";  
import ContactCTA from "@/features/contact";


export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Portfolio />
      <Certifications />
      <ContactCTA />
    </>
  );
}
