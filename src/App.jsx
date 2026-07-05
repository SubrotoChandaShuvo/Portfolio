import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    title: "Blood Love",
    desc: "A MERN stack application dedicated to facilitating blood donations efficiently.",
    tech: ["React","Express.js","JavaScript", "Vite","MongoDB", "SweetAlert2","HTML", "CSS" ],
    color: "text-[#FF6B6B]",
    image: "/proj-bloodlove.png",
    liveUrl: "https://candid-douhua-d628ca.netlify.app/",
    githubUrl: "https://github.com/SubrotoChandaShuvo/BloodLove",
  },
  {
    title: "Paw Mart",
    desc: "An e-commerce themed project for showcasing pet products in an engaging storefront.",
    tech: ["React", "Vite","Express.js","MongoDB", "SweetAlert2","HTML", "CSS", "JavaScript"],
    color: "text-[#4CD6FF]",
    image: "/proj-pawmart.png",
    liveUrl: "https://cosmic-melba-af77ae.netlify.app/",
    githubUrl: "https://github.com/SubrotoChandaShuvo/PowMart",
  },
  {
    title: "Store of Applications",
    desc: "A dynamic web app for searching and downloading curated software effortlessly.",
    tech: ["React", "Tailwind CSS", "Vite", "SweetAlert2"],
    color: "text-[#4CD6FF]",
    image: "/proj-storeofapplications.png",
    liveUrl: "https://flourishing-lily-5fb3c3.netlify.app/AllApps/23",
    githubUrl: "https://github.com/SubrotoChandaShuvo/Store-of-Applications",
  },
  {
    title: "Emergency Hotline",
    desc: "A hotline utility application built to improve emergency information access quickly.",
    tech: ["HTML", "CSS", "JavaScript","SweetAlert2"],
    color: "text-[#FF6B6B]",
    image: "/proj-emergency.png",
    liveUrl: "https://subrotochandashuvo.github.io/Emergency-Hotline/",
    githubUrl: "https://github.com/SubrotoChandaShuvo/Emergency-Hotline",
  },
  {
    title: "Payoo Mobile",
    desc: "A mobile application interface project focused on clean UX and core wallet interactions.",
    tech: ["HTML", "CSS", "JavaScript","SweetAlert2"],
    color: "text-[#FFB3B0]",
    image: "/proj-payoo.png",
    liveUrl: "https://subrotochandashuvo.github.io/Payo-Mobile-Application/home.html",
    githubUrl: "https://github.com/SubrotoChandaShuvo/Payo-Mobile-Application",
  },
];

const EDUCATION = [
  {
    id: 1,
    examName: "B.Sc. in CSE",
    instituteName: "Metropolitan University",
    rollOrId: "ID: 222-115-198",
    result: "CGPA: 3.72",
    passingYear: "2026",
    certificateUrl: "",
  },
  {
    id: 2,
    examName: "H.S.C.",
    instituteName: "Moulvibazer Govt College",
    details: "Science Section",
    rollOrId: "Roll: 109344",
    result: "GPA: 4.83",
    passingYear: "2023",
    certificateUrl: "",
  },
];

function App() {
  const pageRef = useRef(null);
  const lenisRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle"); // idle, sending, success, error
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (e, text) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText("");
    }, 2000);
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const isProjectsPage = currentHash === "#/projects";

  useEffect(() => {
    // Refresh GSAP ScrollTriggers when switching layout
    ScrollTrigger.refresh();

    if (isProjectsPage) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      // If returning to home and there is a hash for scrolling
      const hash = window.location.hash;
      if (hash && hash.startsWith("#") && hash !== "#/projects") {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el, {
              offset: -90,
              duration: 1.4,
              easing: (t) => 1 - Math.pow(1 - t, 4),
            });
          }
        }, 50);
      }
    }
  }, [isProjectsPage]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Prevent browser from restoring scroll position on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const onLenisScroll = (event) => {
      ScrollTrigger.update();
      setShowScrollTop(event.scroll > 550);
      if (event.limit > 0) {
        setScrollProgress(Math.min(event.scroll / event.limit, 1));
      }
    };
    lenis.on("scroll", onLenisScroll);

    const onMouseMove = (event) => {
      setCursorVisible(true);
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    const onMouseLeave = () => setCursorVisible(false);
    const onMouseOver = (event) => {
      const target = event.target.closest(
        'a, button, input, textarea, [role="button"]',
      );
      setCursorActive(Boolean(target));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);

    const onAnchorClick = (event) => {
      const target = event.target.closest("[data-lenis-anchor]");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      event.preventDefault();

      if (window.location.hash === "#/projects") {
        // Just set the hash to navigate back and let the transition useEffect scroll
        window.location.hash = href;
        return;
      }

      const destination = document.querySelector(href);
      if (!destination) return;

      lenis.scrollTo(destination, {
        offset: -90,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };
    document.addEventListener("click", onAnchorClick);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".js-hero-image",
        { autoAlpha: 0, x: 70, scale: 0.92 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" },
      );

      gsap.fromTo(
        ".js-hero-content",
        { autoAlpha: 0, x: -70 },
        { autoAlpha: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.15 },
      );

      gsap.to(".js-float-orb", {
        y: -12,
        duration: 2.6,
        stagger: 0.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".js-shooting-star",
        { xPercent: -25, yPercent: -15, autoAlpha: 0, scaleX: 0.7 },
        {
          xPercent: 140,
          yPercent: 150,
          autoAlpha: 0.85,
          scaleX: 1.2,
          duration: 2.6,
          ease: "sine.out",
          stagger: {
            each: 1.8,
            repeat: -1,
          },
        },
      );

      gsap.fromTo(
        ".js-about-card",
        { autoAlpha: 0, y: 35, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 72%",
          },
        },
      );

      gsap.fromTo(
        ".js-skill-pill",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#skills",
            start: "top 74%",
          },
        },
      );

      gsap.fromTo(
        ".js-project-card",
        { autoAlpha: 0, y: 36, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 72%",
          },
        },
      );

      // Hero Name Staggered Reveal (Split by Words to prevent breaking)
      const heroName = document.querySelector(".js-hero-name");
      if (heroName) {
        const text = heroName.textContent;
        heroName.innerHTML = text
          .split(" ")
          .map(
            (word) =>
              `<span style="display:inline-block; white-space:nowrap">${word}</span>`,
          )
          .join(" ");

        gsap.from(heroName.children, {
          y: 20,
          opacity: 0,
          rotateX: -45,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Parallax Background Orbs
      gsap.to(".js-parallax-orb", {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Magnetic Buttons Logic
      const magneticButtons = document.querySelectorAll(".js-magnetic");
      magneticButtons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });

      // Enhanced Section Title Reveals
      gsap.utils.toArray("section h2").forEach((title) => {
        gsap.from(title, {
          y: 40,
          opacity: 0,
          skewY: 3,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
          },
        });
      });
    }, pageRef);

    return () => {
      ctx.revert();
      document.removeEventListener("click", onAnchorClick);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      setShowScrollTop(false);
      setCursorVisible(false);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("sending");

    try {
      // Using Web3Forms - simple and zero-dependency
      // Replace 85a633cc-aa1f-4144-8cd7-1f6487a7c85e with your key from https://web3forms.com/
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "85a633cc-aa1f-4144-8cd7-1f6487a7c85e",
          ...formData,
          from_name: "Portfolio Contact Form",
          subject: `New Message from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  const sectionReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const projectReveal = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      {/* TopAppBar */}
      <div className="w-full fixed top-0 z-50 px-4 pt-4">
        <header className="bg-white/5 backdrop-blur-2xl backdrop-saturate-150 rounded-full flex justify-between items-center px-8 py-3 shadow-2xl border border-white/10 w-full max-w-7xl mx-auto transition-all">
          {/* Logo */}
          <div 
            onClick={() => {
              window.location.hash = "";
            }}
            className="flex items-center font-headline italic font-bold tracking-tighter text-2xl cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-[#E5E2E1]">SUB</span>
            <span className="text-[#FF6B6B]">ROTO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
            <a
              data-lenis-anchor
              href="#about"
              className="hover:text-white transition-colors"
            >
              About
            </a>
            <a
              data-lenis-anchor
              href="#experience"
              className="hover:text-white transition-colors"
            >
              Experience
            </a>
            <a
              data-lenis-anchor
              href="#skills"
              className="hover:text-white transition-colors"
            >
              Skills
            </a>
            <a
              data-lenis-anchor
              href="#projects"
              className="hover:text-white transition-colors"
            >
              Projects
            </a>
            <a
              data-lenis-anchor
              href="#contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="js-magnetic hidden md:block font-label text-sm font-semibold text-white border border-white/30 rounded-full px-6 py-2 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 shadow-lg"
            >
              Resume
            </a>
            <span className="material-symbols-outlined lg:hidden text-white cursor-pointer hover:opacity-80">
              menu
            </span>
          </div>
        </header>
      </div>

      <main
        ref={pageRef}
        className="unique-cursor-surface relative min-h-screen pt-20 pb-0 px-6 overflow-hidden flex flex-col items-center"
      >
        {/* Background Decorative Elements */}
        <div className="js-float-orb js-parallax-orb absolute top-[20%] -right-20 w-64 h-64 border-2 border-[#FF6B6B] rounded-full opacity-20 pointer-events-none"></div>
        <div className="js-float-orb js-parallax-orb absolute top-[40%] -left-10 w-32 h-32 bg-[#4CD6FF] rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="js-shooting-star absolute top-16 left-[10%] w-24 h-[2px] bg-gradient-to-r from-white/80 to-transparent rotate-[-18deg] opacity-0 blur-[1px] pointer-events-none"></div>
        <div className="js-shooting-star absolute top-36 left-[26%] w-20 h-[2px] bg-gradient-to-r from-[#4CD6FF]/85 to-transparent rotate-[-16deg] opacity-0 blur-[1px] pointer-events-none"></div>

        {/* Landing Page Content Wrapper */}
        <div className={isProjectsPage ? "hidden" : "contents"}>
          {/* Hero Section */}
        {/* <section className="js-hero relative w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24 mt-8 lg:mt-20">*/}
        <section className="js-hero relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row-reverse lg:items-center justify-between gap-8 lg:gap-24 mt-8 lg:mt-20">
          {/* Header Info - Order 1 on Mobile */}
          <div className="order-1 lg:hidden text-center">
            <h1 className="text-5xl font-headline font-bold leading-tight tracking-tight">
              Hi, I'm <br />
              <span className="js-hero-name text-[#FF6B6B]">
                Subroto Chanda Shuvo
              </span>
            </h1>
            <p className="text-xl font-body text-on-surface/80 mt-4 font-light">
              Full Stack Developer
            </p>
          </div>

          {/* Hero Image Container - New Unique Profile Picture View */}
          <motion.div
            initial={{ opacity: 0, x: 70, scale: 0.92 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-2 js-hero-image relative w-full max-w-sm lg:max-w-md xl:w-1/2 aspect-[4/5] mb-8 lg:mb-0 group cursor-pointer"
          >
            {/* Background Offset Frosted Glass Layer */}
            <div className="absolute top-6 left-6 w-full h-full rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl transition-transform duration-700 ease-out group-hover:translate-x-3 group-hover:translate-y-3 z-0 pointer-events-none"></div>

            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B6B]/40 via-transparent to-[#4CD6FF]/40 rounded-3xl blur-[50px] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>

            {/* Main Image Container */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative z-10 rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_40px_rgba(255,107,107,0.2)] bg-[#131313] transition-all duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4 group-hover:shadow-[0_20px_60px_rgba(76,214,255,0.3)]"
            >
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>

              <img
                alt="Elegant portrait of Subroto Chanda Shuvo"
                className="w-full h-full object-cover object-top scale-100 group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] dark:brightness-95 filter saturate-110 group-hover:saturate-100"
                src="/Photo.png"
              />

              {/* Status Badge inside image */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-white text-xs font-semibold tracking-wider">
                  AVAILABLE FOR HIRE
                </span>
              </div>
            </motion.div>

            {/* Decorative Floating Tech Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-xl z-20 overflow-hidden group-hover:scale-110 group-hover:border-[#4CD6FF]/50 transition-all duration-500"
            >
              {/* Inner content counter-rotating so it stays upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="text-center"
              >
                <span className="block text-[#FF6B6B] font-bold text-xl md:text-2xl font-headline">
                  FULL
                </span>
                <span className="block text-white/70 text-[10px] md:text-xs tracking-widest font-label mt-1">
                  STACK
                </span>
              </motion.div>

              {/* Circular Text using SVG */}
              <svg
                className="absolute inset-0 w-full h-full animate-spin-slow opacity-50"
                viewBox="0 0 100 100"
              >
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="transparent"
                />
                <text className="text-[9px] font-label fill-[#4CD6FF] tracking-[0.2em] uppercase">
                  <textPath href="#circlePath" startOffset="0%">
                    Developer • Designer • Creator •
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* Accent Glowing Dots */}
            <div className="absolute top-1/4 -right-4 w-2 h-2 bg-[#FF6B6B] rounded-full shadow-[0_0_10px_#FF6B6B] animate-ping pointer-events-none z-30"></div>
            <div className="absolute bottom-1/4 -left-6 w-3 h-3 bg-[#4CD6FF] rounded-full shadow-[0_0_15px_#4CD6FF] animate-pulse pointer-events-none z-30 delay-300"></div>
          </motion.div>

          {/* Content Area - Order 3 on Mobile */}
          <div className="order-3 js-hero-content text-center lg:text-left w-full lg:w-1/2 space-y-8 relative z-20 flex flex-col items-center lg:items-start">
            <div className="hidden lg:block">
              <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight tracking-tight">
                Hi, I'm <br className="hidden lg:block" />
                <span className="js-hero-name text-[#FF6B6B]">
                  Subroto Chanda Shuvo
                </span>
              </h1>
              <p className="text-xl lg:text-2xl font-body text-on-surface/80 mt-4 font-light">
                Full Stack Developer
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:justify-start gap-6 py-4">
              <button
                onClick={() => {
                  if (lenisRef.current) {
                    lenisRef.current.scrollTo("#contact", {
                      offset: -90,
                      duration: 1.5,
                      easing: (t) => 1 - Math.pow(1 - t, 4),
                    });
                  } else {
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="js-magnetic bg-gradient-to-r from-[#FFB3B0] to-[#FF6B6B] text-on-primary-container px-8 py-4 rounded-full flex items-center gap-2 font-bold shadow-[0_0_30px_rgba(255,107,107,0.3)] transform hover:scale-105 active:scale-95 transition-all"
              >
                Get In Touch
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>

              <a
                className="js-magnetic flex items-center gap-2 bg-[#4CD6FF]/10 dark:bg-[#4CD6FF]/10 hover:bg-[#4CD6FF]/20 text-[#4CD6FF] border border-[#4CD6FF]/30 px-6 py-4 rounded-full transition-all group font-label tracking-wide text-sm font-semibold shadow-[0_0_20px_rgba(76,214,255,0.2)]"
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download Resume</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-y-1 transition-transform">
                  south
                </span>
              </a>
            </div>

            <div className="space-y-4 pt-8 text-left border-t border-outline-variant/15 w-full max-w-sm lg:max-w-md">
              <div className="flex items-center gap-3">
                <span className="text-tertiary text-xs font-bold tracking-[0.2em] uppercase">
                  Expert on
                </span>
                <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
              </div>
              <p className="text-on-surface/70 text-base leading-relaxed">
                I am a Full Stack Developer and Computer Science student at
                Metropolitan University with a strong focus on building
                full-stack web applications using TypeScript,Express.js, React, Next.js, Node.js, NeonDB, MongoDB.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section
          id="about"
          className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24 mt-24 pt-24 px-6 md:px-0 scroll-mt-20"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#FF6B6B] mb-6">
              Discover who I am.
            </h2>
            <p className="text-on-surface/80 leading-relaxed text-lg mb-6 font-light">
              I am a Full Stack Developer and Computer Science student at
              Metropolitan University, Sylhet. I build full-stack web
              applications using TypeScript,Express.js, React, Next.js, Node.js, NeonDB, MongoDB.
            </p>
            <p className="text-on-surface/80 leading-relaxed text-lg font-light">
              I bring experience in leadership and education
              through my role at TRC Education.
            </p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 p-4">
            {/* <div className="js-about-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-2xl hover:bg-white/10 transition-colors">
              <span className="text-5xl font-headline font-bold text-[#FFB3B0]">
                1+
              </span>
              <span className="text-xs text-on-surface/60 uppercase tracking-widest mt-4">
                Year Exp
              </span>
            </div>  */}
            <div className="js-about-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-2xl hover:bg-white/10 transition-colors translate-y-12">
              <span className="text-5xl font-headline font-bold text-[#4CD6FF]">
                12+
              </span>
              <span className="text-xs text-on-surface/60 uppercase tracking-widest mt-4">
                Projects
              </span>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          id="experience"
          className="relative w-full max-w-4xl mx-auto mt-40 pt-24 px-6 md:px-0 scroll-mt-20"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">
              My <span className="text-[#4CD6FF]">Experience</span>
            </h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">
              My professional journey
            </p>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:pl-0">
            {/* Item 1 */}
            <div className="mb-20 relative pl-8 md:pl-0 md:flex items-center group">
              <div className="hidden md:block md:w-1/2 pr-16 text-right">
                <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">
                  Senior Faculty
                </h3>
                <p className="text-[#FF6B6B] mt-1 font-label">TRC Education</p>
                <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">
                  Mentoring and leadership, fostering growth and providing
                  education using modern pedagogical approaches.
                </p>
              </div>
              <div className="absolute left-[-9px] md:left-1/2 md:-ml-2 w-5 h-5 bg-[#FF6B6B] rounded-full top-2 md:top-auto ring-4 ring-[#131313] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_#FF6B6B]"></div>
              <div className="md:w-1/2 md:pl-16">
                <span className="inline-block bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-full px-5 py-1.5 text-sm text-[#FFB3B0] font-label mb-2 md:mb-0 backdrop-blur-md">
                  Jan 2023 - Present
                </span>
                <div className="md:hidden mt-4">
                  <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">
                    Senior Faculty
                  </h3>
                  <p className="text-[#FF6B6B] mt-1 font-label">
                    TRC Education
                  </p>
                  <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">
                    Mentoring and leadership, fostering growth and providing
                    education using modern pedagogical approaches.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative pl-8 md:pl-0 md:flex items-center group">
              <div className="md:w-1/2 md:pr-16 md:text-right">
                <span className="inline-block bg-[#4CD6FF]/10 border border-[#4CD6FF]/30 rounded-full px-5 py-1.5 text-sm text-[#4CD6FF] font-label mb-2 md:mb-0 backdrop-blur-md">
                  Apr 2024 - Dec 2024
                </span>
                <div className="md:hidden mt-4">
                  <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">
                    PDS Training
                  </h3>
                  <p className="text-[#4CD6FF] mt-1 font-label">SUST</p>
                  <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">
                    Teach physics, ICT, mathematics, chemistry, and biology.
                    Comprehensive training in technology and programming for
                    school students.
                  </p>
                </div>
              </div>
              <div className="absolute left-[-9px] md:left-1/2 md:-ml-2 w-5 h-5 bg-[#4CD6FF] rounded-full top-2 md:top-auto ring-4 ring-[#131313] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_#4CD6FF]"></div>
              <div className="hidden md:block md:w-1/2 pl-16 text-left">
                <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">
                  PDS Training
                </h3>
                <p className="text-[#4CD6FF] mt-1 font-label">SUST</p>
                <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">
                  Comprehensive training in Python, Data Science, and
                  fundamental algorithm design.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Tech Stack & Skills Section */}
        <motion.section
          id="skills"
          className="relative w-full max-w-6xl mx-auto mt-40 pt-24 px-6 md:px-0 scroll-mt-20"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">
              Tech <span className="text-[#FF6B6B]">Stack</span>
            </h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">
              Tools and Technologies
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "HTML/CSS",
              "JavaScript",
              "TypeScript",
              "PostgreSQL",
              "React",
              "MongoDB",
              "NeonDB",
              "Express.js",
              "Node.js",
              "MySQL",
              "C/C++",
              "Python",
              "Pandas",
              "Scikit-learn",
              "Vite",
              "DaisyUI",
              "Tailwind",
              "Git",
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  boxShadow: "0 0 25px rgba(255,107,107,0.4)",
                }}
                className="js-reveal-item js-skill-pill bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full px-8 py-3 flex items-center justify-center shadow-lg transition-all cursor-default relative group overflow-hidden"
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="text-on-surface dark:text-[#E5E2E1] font-medium tracking-wide z-10">
                    {skill}
                  </span>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/0 via-[#FF6B6B]/10 to-[#FF6B6B]/0 opacity-0 group-hover:opacity-100 transform -translateX-full group-hover:translate-x-full transition-all duration-1000"></div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          className="relative w-full max-w-6xl mx-auto mt-40 pt-24 px-6 md:px-0 scroll-mt-20"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">
              Featured <span className="text-[#4CD6FF]">Projects</span>
            </h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">
              Some of my recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((project, idx) => (
              <motion.div
                key={idx}
                className="js-project-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-500 group shadow-2xl flex flex-col h-full hover:border-white/20"
                variants={projectReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  ease: "easeOut",
                  delay: idx * 0.1,
                }}
              >
                <div className="w-full aspect-video bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/70 via-[#131313]/30 to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <h3
                    className={`text-2xl font-bold font-headline ${project.color} mb-6`}
                  >
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-3 mt-auto">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-semibold transition-colors duration-300 text-sm"
                    >
                      Preview
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 text-center bg-white/10 hover:bg-[#4CD6FF] hover:text-black text-white py-3 rounded-full font-semibold transition-colors duration-300 text-sm cursor-pointer"
                    >
                      Details
                    </button>
                    <a
                      href={project.githubUrl || "https://github.com/SubrotoChandaShuvo"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/10 text-white rounded-full transition-colors duration-300 flex-shrink-0 active:scale-95"
                      title="GitHub Code"
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <button
              onClick={() => {
                window.location.hash = "#/projects";
              }}
              className="js-magnetic group relative overflow-hidden bg-gradient-to-r from-[#4CD6FF] to-[#FF6B6B] text-black px-10 py-4.5 rounded-full font-bold shadow-[0_0_30px_rgba(76,214,255,0.25)] hover:shadow-[0_0_40px_rgba(76,214,255,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              <span className="font-label text-base tracking-wide">See More Projects</span>
              <span className="material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:translate-x-1">
                arrow_right_alt
              </span>
            </button>
          </div>
        </motion.section>


        {/* Education & Certification Section */}
        <motion.section
          id="education"
          className="relative w-full max-w-4xl mx-auto mt-40 pt-24 px-6 md:px-0 scroll-mt-20"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">
              Education & <span className="text-[#4CD6FF]">Certification</span>
            </h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">
              Academic Qualifications & Credentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {EDUCATION.map((edu, idx) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Accent Top Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${idx === 0 ? "from-[#4CD6FF] to-[#FF6B6B]" : "from-[#FF6B6B] to-[#FFB3B0]"}`}></div>

                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold font-headline text-[#e5e2e1]">
                        {edu.examName}
                      </h3>
                      <p className="text-[#4CD6FF] font-medium text-sm mt-1">
                        {edu.instituteName}
                      </p>
                      {edu.details && (
                        <p className="text-white/50 text-xs mt-1 font-light italic">
                          {edu.details}
                        </p>
                      )}
                    </div>
                    <span className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs text-white/70 font-semibold flex-shrink-0">
                      {edu.passingYear}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5 text-sm">
                    <div>
                      <span className="block text-xs text-white/40 font-label uppercase tracking-wider mb-1">
                        Result
                      </span>
                      <span className="font-semibold text-white/90">{edu.result}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-white/40 font-label uppercase tracking-wider mb-1">
                        Credential
                      </span>
                      <span className="font-semibold text-white/90">{edu.rollOrId}</span>
                    </div>
                  </div>
                </div>

                {edu.certificateUrl && (
                  <div className="mt-8">
                    <a
                      href={edu.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#4CD6FF]/10 hover:bg-[#4CD6FF]/20 text-[#4CD6FF] border border-[#4CD6FF]/20 hover:border-[#4CD6FF]/40 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">workspace_premium</span>
                      View Certificate
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="relative w-full max-w-4xl mx-auto mt-40 pt-24 px-6 md:px-0 mb-40 scroll-mt-20"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">
              Let's <span className="text-[#FFB3B0]">Connect</span>
            </h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">
              Ready to start a project?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
            {/* Left Card: Contact Info */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#4CD6FF]"></div>
              
              <div>
                <h3 className="text-2xl font-bold font-headline text-[#e5e2e1] mb-3">
                  Contact Info
                </h3>
                <p className="text-on-surface/60 text-sm font-light leading-relaxed mb-8">
                  Have a project in mind or just want to chat? Reach out through any of these platforms.
                </p>

                <div className="space-y-4">
                  {/* Email Card */}
                  <a
                    href="mailto:subrotochandashuvo@gmail.com"
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center text-[#FF6B6B] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">mail</span>
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="block text-xs text-white/50 font-label uppercase tracking-wider">Email Me</span>
                      <span className="block text-xs xl:text-sm text-white/90 font-medium break-all">subrotochandashuvo@gmail.com</span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, "subrotochandashuvo@gmail.com")}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 active:scale-90 flex-shrink-0 z-10"
                      title="Copy Email"
                    >
                      <span className="material-symbols-outlined text-[16px] font-semibold">
                        {copiedText === "subrotochandashuvo@gmail.com" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </a>

                  {/* Mobile Card */}
                  <a
                    href="tel:+8801312672210"
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#4CD6FF]/10 flex items-center justify-center text-[#4CD6FF] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="block text-xs text-white/50 font-label uppercase tracking-wider">Call Me</span>
                      <span className="block text-xs xl:text-sm text-white/90 font-medium break-all">+880 1312-672210</span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, "+8801312672210")}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 active:scale-90 flex-shrink-0 z-10"
                      title="Copy Phone Number"
                    >
                      <span className="material-symbols-outlined text-[16px] font-semibold">
                        {copiedText === "+8801312672210" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </a>

                  {/* WhatsApp Card */}
                  <a
                    href="https://wa.me/8801312672210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.013-5.101-2.859-6.949-1.847-1.849-4.305-2.868-6.938-2.869-5.441 0-9.869 4.42-9.873 9.853-.001 1.77.465 3.503 1.353 5.039l-1.01 3.693 3.79-1.013zm11.758-5.321c-.328-.164-1.94-.959-2.241-1.07-.302-.11-.522-.164-.741.164-.219.329-.851 1.07-1.042 1.29-.19.219-.381.246-.709.082-.328-.164-1.386-.511-2.64-1.631-.975-.87-1.633-1.946-1.824-2.274-.19-.329-.02-.507.144-.67.148-.147.328-.384.492-.575.164-.19.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.741-1.785-1.015-2.443-.267-.643-.541-.555-.741-.565-.19-.01-.41-.01-.628-.01-.219 0-.576.082-.876.411-.3.329-1.152 1.123-1.152 2.738 0 1.615 1.177 3.178 1.341 3.397.164.219 2.315 3.535 5.607 4.954.783.338 1.394.54 1.868.69.788.25 1.506.214 2.072.13.631-.094 1.94-.793 2.214-1.558.275-.765.275-1.422.193-1.558-.082-.136-.301-.219-.628-.383z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="block text-xs text-white/50 font-label uppercase tracking-wider">WhatsApp Me</span>
                      <span className="block text-xs xl:text-sm text-white/90 font-medium break-all">+880 1312-672210</span>
                    </div>
                    <button
                      onClick={(e) => handleCopy(e, "+8801312672210")}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 flex items-center justify-center transition-all duration-300 active:scale-90 flex-shrink-0 z-10"
                      title="Copy WhatsApp Number"
                    >
                      <span className="material-symbols-outlined text-[16px] font-semibold">
                        {copiedText === "+8801312672210" ? "done" : "content_copy"}
                      </span>
                    </button>
                  </a>

                  {/* Location Card */}
                  <a
                    href="https://maps.google.com/?q=Modina+Market,+Sylhet,+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 rounded-2xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#FFB3B0]/10 flex items-center justify-center text-[#FFB3B0] group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">location_on</span>
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="block text-xs text-white/50 font-label uppercase tracking-wider">My Location</span>
                      <span className="block text-xs xl:text-sm text-white/90 font-medium break-all">Modina Market, Sylhet, Bangladesh</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card: Send Message */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFB3B0] via-[#FF6B6B] to-[#4CD6FF]"></div>
              
              <h3 className="text-2xl font-bold font-headline text-[#e5e2e1] mb-3">
                Send Message
              </h3>
              <p className="text-on-surface/60 text-sm font-light leading-relaxed mb-8">
                Drop me a line and I'll get back to you as soon as possible.
              </p>

              <form
                className="space-y-6"
                onSubmit={handleFormSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-label text-white/70 ml-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#131313]/60 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-label text-white/70 ml-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-[#131313]/60 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-label text-white/70 ml-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    required
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-[#131313]/60 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full bg-gradient-to-r from-[#FFB3B0] to-[#FF6B6B] text-on-primary-container py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(255,107,107,0.2)] transform hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex justify-center items-center gap-2 ${formStatus === "sending" ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {formStatus === "sending" ? "Sending..." : "Send Message"}
                  <span className="material-symbols-outlined text-lg">
                    {formStatus === "sending" ? "sync" : "send"}
                  </span>
                </button>

                {formStatus === "success" && (
                  <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center text-sm font-medium animate-pulse">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm font-medium">
                    Oops! Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.section>
        </div>

        {/* All Projects Page View */}
        {isProjectsPage && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-6xl mx-auto mt-12 pt-8 px-6 md:px-0"
          >
            <div className="mb-8">
              <button
                onClick={() => {
                  window.location.hash = "";
                }}
                className="group flex items-center gap-2 text-on-surface/70 hover:text-white transition-colors duration-300 font-label text-sm bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10"
              >
                <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:-translate-x-1">
                  arrow_back
                </span>
                Back to Home
              </button>
            </div>

            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-[#e5e2e1] leading-tight">
                All <span className="text-[#4CD6FF]">Projects</span>
              </h1>
              <p className="text-on-surface/60 mt-4 text-base max-w-xl mx-auto font-light leading-relaxed">
                A complete archive of applications and frontend experiences I've designed and developed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {PROJECTS.map((project, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-500 group shadow-2xl flex flex-col h-full hover:border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                >
                  <div className="w-full aspect-video bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/70 via-[#131313]/30 to-transparent"></div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow justify-between">
                    <h3 className={`text-2xl font-bold font-headline ${project.color} mb-6`}>
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-auto">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-semibold transition-colors duration-300 text-sm"
                      >
                        Preview
                      </a>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex-1 text-center bg-white/10 hover:bg-[#4CD6FF] hover:text-black text-white py-3 rounded-full font-semibold transition-colors duration-300 text-sm cursor-pointer"
                      >
                        Details
                      </button>
                      <a
                        href={project.githubUrl || "https://github.com/SubrotoChandaShuvo"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/10 text-white rounded-full transition-colors duration-300 flex-shrink-0 active:scale-95"
                        title="GitHub Code"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <footer className="w-full border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md py-12 px-6 mt-20 relative z-40">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div 
                onClick={() => {
                  window.location.hash = "";
                }}
                className="font-headline italic font-bold tracking-tighter text-3xl opacity-90 mb-2 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <span className="text-[#E5E2E1]">SUB</span>
                <span className="text-[#FF6B6B]">ROTO</span>
              </div>
              <p className="text-on-surface/50 text-sm font-light">
                Crafting digital experiences with love.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/subrotochanda.subrotochanda.3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.91h-2.3V22C18.34 21.24 22 17.08 22 12.06z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/subroto-chanda-shuvo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#4CD6FF] hover:border-[#4CD6FF] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 10.34H5.67V18H8.34V10.34M7 6.75A1.56 1.56 0 1 0 7 9.87A1.56 1.56 0 1 0 7 6.75M18.33 13.34C18.33 11 17.84 9.2 15.1 9.2C13.79 9.2 12.91 9.92 12.55 10.61H12.51V10.34H9.95V18H12.62V14.2C12.62 13.2 12.81 12.23 14.05 12.23C15.27 12.23 15.29 13.37 15.29 14.27V18H18V13.8L18.33 13.34Z" />
                </svg>
              </a>
              <a
                href="https://github.com/SubrotoChandaShuvo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#7A8CFF] hover:border-[#7A8CFF] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="mailto:subrotochandashuvo@gmail.com"
                aria-label="Send email"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FFB3B0] hover:border-[#FFB3B0] transition-all duration-300"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-on-surface/40 text-xs font-label">
              © {new Date().getFullYear()} Subroto Chanda Shuvo. All rights
              reserved.
            </p>
            <div className="flex gap-6 text-on-surface/40 text-xs font-label">
              {/* <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a> */}
            </div>
          </div>
        </footer>

        {/* Social Icons Column (Fixed Left) */}
        <aside className="fixed bottom-12 left-6 flex flex-col gap-6 z-40 hidden md:flex">
          <a
            className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110"
            href="https://www.facebook.com/subrotochanda.subrotochanda.3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook profile"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              aria-hidden="true"
            >
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.91h-2.3V22C18.34 21.24 22 17.08 22 12.06z" />
            </svg>
          </a>
          <a
            className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110"
            href="https://www.linkedin.com/in/subroto-chanda-shuvo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              aria-hidden="true"
            >
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 10.34H5.67V18H8.34V10.34M7 6.75A1.56 1.56 0 1 0 7 9.87A1.56 1.56 0 1 0 7 6.75M18.33 13.34C18.33 11 17.84 9.2 15.1 9.2C13.79 9.2 12.91 9.92 12.55 10.61H12.51V10.34H9.95V18H12.62V14.2C12.62 13.2 12.81 12.23 14.05 12.23C15.27 12.23 15.29 13.37 15.29 14.27V18H18V13.8L18.33 13.34Z" />
            </svg>
          </a>
          <a
            className="text-on-surface/40 hover:text-[#7A8CFF] transition-transform hover:scale-110"
            href="https://github.com/SubrotoChandaShuvo"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              aria-hidden="true"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110"
            href="mailto:subrotochandashuvo@gmail.com"
            aria-label="Send email"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              aria-hidden="true"
            >
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
            </svg>
          </a>
        </aside>

        {/* Scroll To Top */}
        {showScrollTop && (
          <div className="fixed bottom-10 right-6 z-50">
            <button
              type="button"
              aria-label="Scroll back to top"
              onClick={() => {
                if (lenisRef.current) {
                  lenisRef.current.scrollTo(0, {
                    duration: 1.2,
                    easing: (t) => 1 - Math.pow(1 - t, 4),
                  });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-black hover:bg-[#121212] shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.55)] active:scale-90 transition-all duration-300 border border-white/20"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                arrow_upward
              </span>
            </button>
          </div>
        )}
      </main>

      <div
        className="hidden md:block fixed top-0 left-0 z-[90] pointer-events-none w-10 h-10 rounded-full border border-[#4CD6FF]/70 transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${cursorPosition.x - 20}px, ${cursorPosition.y - 20}px) scale(${cursorActive ? 1.5 : 1})`,
          opacity: cursorVisible ? 1 : 0,
        }}
      />
      <div
        className="hidden md:block fixed top-0 left-0 z-[91] pointer-events-none w-2.5 h-2.5 rounded-full bg-[#FF6B6B] shadow-[0_0_12px_rgba(255,107,107,0.8)] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${cursorPosition.x - 5}px, ${cursorPosition.y - 5}px) scale(${cursorActive ? 0.8 : 1})`,
          opacity: cursorVisible ? 1 : 0,
        }}
      />

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-3xl bg-[#131313]/95 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh] z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 text-white rounded-full transition-all duration-300 z-20 cursor-pointer active:scale-95"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              {/* Scrollable container */}
              <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Image (minimized) */}
                  <div className="md:col-span-5">
                    <div className="w-full aspect-video bg-black/40 relative overflow-hidden rounded-[1.2rem] border border-white/5 shadow-inner">
                      <img
                        src={selectedProject.image}
                        alt={`${selectedProject.title} preview`}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/55 to-transparent"></div>
                    </div>
                  </div>

                  {/* Right Column: Title, Description, and Tech Stack */}
                  <div className="md:col-span-7">
                    {/* Project Title */}
                    <div className="mb-4">
                      <span className="text-[10px] md:text-xs uppercase tracking-widest font-label text-on-surface/50 font-semibold">
                        PROJECT PROFILE
                      </span>
                      <h2 className={`text-xl md:text-2xl font-bold font-headline mt-1 ${selectedProject.color}`}>
                        {selectedProject.title}
                      </h2>
                    </div>

                    {/* Project Description */}
                    <div className="mb-4 text-xs md:text-sm">
                      <h4 className="font-label text-white/70 mb-1.5 uppercase tracking-wider font-semibold">
                        Description
                      </h4>
                      <p className="text-on-surface/85 font-light leading-relaxed">
                        {selectedProject.desc}
                      </p>
                    </div>

                    {/* Tech pills */}
                    <div className="mb-2 text-xs md:text-sm">
                      <h4 className="font-label text-white/70 mb-2 uppercase tracking-wider font-semibold">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-label bg-white/10 px-3 py-1 rounded-full text-white/90"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-6 border-t border-white/5">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 text-center bg-gradient-to-r from-[#4CD6FF] to-[#FF6B6B] text-black py-3 rounded-full font-bold transition-all duration-300 text-sm shadow-[0_0_20px_rgba(76,214,255,0.1)] hover:shadow-[0_0_25px_rgba(76,214,255,0.25)] hover:scale-[1.01]"
                  >
                    Live Preview
                  </a>
                  <a
                    href={selectedProject.githubUrl || "https://github.com/SubrotoChandaShuvo"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-full font-semibold transition-all duration-300 text-sm flex justify-center items-center gap-2 hover:scale-[1.01]"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub Code
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
