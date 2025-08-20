"use client";

export default function Hero() {
  return (
    <section className="hero relative flex items-center justify-center min-h-screen bg-black text-white">
      <div className="container text-center">
        <h1
          className="font-black uppercase tracking-tight leading-[0.9] [text-wrap:balance]"
          style={{
            fontSize: "clamp(4rem, 10vw, 10rem)",
            WebkitTextStrokeWidth: "0.4px",
            WebkitTextStrokeColor: "rgba(255,255,255,0.18)",
          }}
        >
          <span className="block">LUIS</span>
          <span className="block">NORIEGA</span>
        </h1>
      </div>
    </section>
  );
}
