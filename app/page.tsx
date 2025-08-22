import Hero from "@/features/hero";
import Work from "@/features/work";
import Certifications from "@/features/skills";  
import Projects from "@/features/projects";
import Books from "@/features/books";
import ContactCTA from "@/features/contact";


export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Certifications />
      <Projects />
      <Books />
      <ContactCTA />
    </>
  );
}
