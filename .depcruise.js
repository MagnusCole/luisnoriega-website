// Dependency Cruiser rules to enforce boundaries
module.exports = {
  forbidden: [
    {
      name: "no-three-outside",
      comment: "three solo en components/three",
      severity: "warn",
      from: { pathNot: "^components/three" },
      to: { path: "node_modules/three" }
    },
    {
      name: "no-motion-outside",
      comment: "ScrollTrigger/gsap solo via lib/motion",
      severity: "error",
      to: { path: "gsap|ScrollTrigger", pathNot: "lib/motion" }
    }
  ]
};
