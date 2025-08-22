import Hero from "@/features/hero";
import Bio from "@/features/bio";
import Certifications from "@/features/skills";  
import Projects from "@/features/projects";
import Books from "@/features/books";
import ContactCTA from "@/features/contact";


export default function Home() {
  return (
    <>
      <Hero />
      <Bio />
      <Certifications />
      <Projects />
      <Books />
      <ContactCTA />
    </>
  );
}
