"use client";

export default function About() {
  return (
  <section id="about" className="about-section min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div className="container max-w-4xl">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tight">
            About Me
          </h2>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-foreground/80">
            <p>
              Creative developer and designer passionate about crafting exceptional digital experiences 
              that push the boundaries of web technology.
            </p>
            <p>
              Specializing in award-winning websites, motion design, and innovative user interfaces 
              that combine aesthetic excellence with technical precision.
            </p>
            <p>
              Currently exploring the intersection of AI, creative coding, and human-centered design 
              to create the next generation of digital experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
