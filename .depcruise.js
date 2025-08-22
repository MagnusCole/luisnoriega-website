// Dependency Cruiser rules to enforce boundaries
module.exports = {
  forbidden: [
    {
      name: "no-three-outside",
      comment: "three solo en components/three",
      severity: "warn",
      from: { 
        path: "^(app|components|lib|shared)/", 
        pathNot: "^components/three" 
      },
      to: { 
        path: "^node_modules/three(|/.*)$" 
      }
    },
    {
      name: "no-gsap-raw",
      comment: "gsap/ScrollTrigger solo se permite importarse directamente desde lib/motion/gsap.ts",
      severity: "error",
      from: { 
        path: "^(app|components|lib|shared)/", 
        pathNot: "^lib/motion/gsap\\.ts$" 
      },
      to: { 
        path: "^node_modules/gsap(|/.*)$" 
      }
    }
  ],
  options: {
    exclude: "^(node_modules|\\.next|out|build)/",
    doNotFollow: { 
      path: "node_modules" 
    }
  }
};
