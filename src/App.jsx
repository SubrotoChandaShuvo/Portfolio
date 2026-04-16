import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {
  const pageRef = useRef(null);
  const lenisRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.065,
      smoothWheel: true,
      wheelMultiplier: 0.75,
      touchMultiplier: 1.1,
      syncTouch: true,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const onLenisScroll = (event) => {
      ScrollTrigger.update();
      setShowScrollTop(event.scroll > 550);
      if (event.limit > 0) {
        setScrollProgress(Math.min(event.scroll / event.limit, 1));
      }
    };
    lenis.on('scroll', onLenisScroll);

    const onMouseMove = (event) => {
      setCursorVisible(true);
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    const onMouseLeave = () => setCursorVisible(false);
    const onMouseOver = (event) => {
      const target = event.target.closest('a, button, input, textarea, [role="button"]');
      setCursorActive(Boolean(target));
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver);

    const onAnchorClick = (event) => {
      const target = event.target.closest('[data-lenis-anchor]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const destination = document.querySelector(href);
      if (!destination) return;

      event.preventDefault();
      lenis.scrollTo(destination, {
        offset: -90,
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };
    document.addEventListener('click', onAnchorClick);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.js-hero-image',
        { autoAlpha: 0, x: 70, scale: 0.92 },
        { autoAlpha: 1, x: 0, scale: 1, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.js-hero-content',
        { autoAlpha: 0, x: -70 },
        { autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.15 }
      );

      gsap.to('.js-float-orb', {
        y: -12,
        duration: 2.6,
        stagger: 0.35,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.fromTo(
        '.js-shooting-star',
        { xPercent: -25, yPercent: -15, autoAlpha: 0, scaleX: 0.7 },
        {
          xPercent: 140,
          yPercent: 150,
          autoAlpha: 0.85,
          scaleX: 1.2,
          duration: 2.6,
          ease: 'sine.out',
          stagger: {
            each: 1.8,
            repeat: -1,
          },
        }
      );

      gsap.fromTo(
        '.js-about-card',
        { autoAlpha: 0, y: 35, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 72%',
          },
        }
      );

      gsap.fromTo(
        '.js-skill-pill',
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 74%',
          },
        }
      );

      gsap.fromTo(
        '.js-project-card',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 72%',
          },
        }
      );
    }, pageRef);

    return () => {
      ctx.revert();
      document.removeEventListener('click', onAnchorClick);
      document.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      lenis.off('scroll', onLenisScroll);
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
      setShowScrollTop(false);
      setCursorVisible(false);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
      <div className="fixed top-0 left-0 w-full h-[3px] z-[70] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#4CD6FF] via-[#7A8CFF] to-[#FF6B6B] shadow-[0_0_20px_rgba(76,214,255,0.5)] transition-[width] duration-150"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* TopAppBar */}
      <div className="w-full fixed top-0 z-50 px-4 pt-4">
        <header className="bg-white/5 backdrop-blur-2xl backdrop-saturate-150 rounded-full flex justify-between items-center px-8 py-3 shadow-2xl border border-white/10 w-full max-w-7xl mx-auto transition-all">
          {/* Logo */}
          <div className="flex items-center font-headline italic font-bold tracking-tighter text-2xl cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-[#E5E2E1]">SUB</span>
            <span className="text-[#FF6B6B]">ROTO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
            <a data-lenis-anchor href="#about" className="hover:text-white transition-colors">About</a>
            <a data-lenis-anchor href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a data-lenis-anchor href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a data-lenis-anchor href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a data-lenis-anchor href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Action Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden md:block font-label text-sm font-semibold text-white border border-white/30 rounded-full px-6 py-2 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 shadow-lg">
              Resume
            </a>
            <span className="material-symbols-outlined lg:hidden text-white cursor-pointer hover:opacity-80">menu</span>
          </div>
        </header>
      </div>

      <main ref={pageRef} className="unique-cursor-surface relative min-h-screen pt-20 pb-0 px-6 overflow-hidden flex flex-col items-center">
        {/* Background Decorative Elements */}
        <div className="js-float-orb absolute top-[20%] -right-20 w-64 h-64 border-2 border-[#FF6B6B] rounded-full opacity-20 pointer-events-none"></div>
        <div className="js-float-orb absolute top-[40%] -left-10 w-32 h-32 bg-[#4CD6FF] rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>
        <div className="js-shooting-star absolute top-16 left-[10%] w-24 h-[2px] bg-gradient-to-r from-white/80 to-transparent rotate-[-18deg] opacity-0 blur-[1px] pointer-events-none"></div>
        <div className="js-shooting-star absolute top-36 left-[26%] w-20 h-[2px] bg-gradient-to-r from-[#4CD6FF]/85 to-transparent rotate-[-16deg] opacity-0 blur-[1px] pointer-events-none"></div>

        {/* Hero Section */}
       {/* <section className="js-hero relative w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24 mt-8 lg:mt-20">*/}
       <section className="js-hero relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24 mt-8 lg:mt-20">
          {/* Hero Image Container */}
          <div className="js-hero-image relative w-full max-w-md lg:max-w-none lg:w-1/2 aspect-[4/5] mb-12 lg:mb-0">
            {/* Cyan Geometric Accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-tertiary rounded-full pointer-events-none opacity-40"></div>
            
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,107,107,0.15)] relative z-10 transition-transform duration-500 hover:scale-[1.02]">
              <img 
                alt="Elegant portrait of Subroto Chanda Shuvo" 
                className="w-full h-full object-cover" 
                src="/Photo.png"
              />
            </div>
            
            {/* Floating Decorative Coral Ring */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 border-[12px] border-[#FF6B6B]/15 rounded-full pointer-events-none lg:translate-x-12 lg:translate-y-12"></div>
          </div>

          {/* Content Area */}
          <div className="js-hero-content text-center lg:text-left w-full lg:w-1/2 space-y-8 relative z-20 flex flex-col items-center lg:items-start">
            <div>
              <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight tracking-tight">
                Hi, I'm <br className="hidden lg:block"/>
                <span className="text-[#FF6B6B]">Subroto Chanda Shuvo</span>
              </h1>
              <p className="text-xl lg:text-2xl font-body text-on-surface/80 mt-4 font-light">
                MERN Stack Developer
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center lg:justify-start gap-6 py-4">
              <button className="bg-gradient-to-r from-[#FFB3B0] to-[#FF6B6B] text-on-primary-container px-8 py-4 rounded-full flex items-center gap-2 font-bold shadow-[0_0_30px_rgba(255,107,107,0.3)] transform hover:scale-105 active:scale-95 transition-all">
                Hire Me
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
              
              <a className="flex items-center gap-2 text-on-surface/60 hover:text-[#FFB3B0] transition-colors py-2 group" href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
                <span className="font-label tracking-widest text-sm uppercase">Download CV</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-y-1 transition-transform">south</span>
              </a>
            </div>
            
            <div className="space-y-4 pt-8 text-left border-t border-outline-variant/15 w-full max-w-sm lg:max-w-md">
              <div className="flex items-center gap-3">
                <span className="text-tertiary text-xs font-bold tracking-[0.2em] uppercase">Expert on</span>
                <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
              </div>
              <p className="text-on-surface/70 text-base leading-relaxed">
                I am a MERN Stack Developer and Computer Science student at Metropolitan University with a strong focus on building full-stack web applications using MongoDB, Express.js, React, and Node.js.
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
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#FF6B6B] mb-6">Discover who I am.</h2>
            <p className="text-on-surface/80 leading-relaxed text-lg mb-6 font-light">
              I am a MERN Stack Developer and Computer Science student at Metropolitan University, Sylhet. I build full-stack web applications using MongoDB, Express.js, React, and Node.js — combining powerful backends with beautiful, responsive frontends.
            </p>
            <p className="text-on-surface/80 leading-relaxed text-lg font-light">
              Beyond web development, I have trained in Data Science and Machine Learning, and I bring experience in leadership and education through my role at TRC Education.
            </p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 p-4">
            <div className="js-about-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-2xl hover:bg-white/10 transition-colors">
              <span className="text-5xl font-headline font-bold text-[#FFB3B0]">1+</span>
              <span className="text-xs text-on-surface/60 uppercase tracking-widest mt-4">Year Exp</span>
            </div>
            <div className="js-about-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-2xl hover:bg-white/10 transition-colors translate-y-12">
              <span className="text-5xl font-headline font-bold text-[#4CD6FF]">12+</span>
              <span className="text-xs text-on-surface/60 uppercase tracking-widest mt-4">Projects</span>
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
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">My <span className="text-[#4CD6FF]">Experience</span></h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">My professional journey</p>
          </div>
          
          <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:pl-0">
            {/* Item 1 */}
            <div className="mb-20 relative pl-8 md:pl-0 md:flex items-center group">
              <div className="hidden md:block md:w-1/2 pr-16 text-right">
                <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">Senior Faculty</h3>
                <p className="text-[#FF6B6B] mt-1 font-label">TRC Education</p>
                <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">Mentoring and leadership, fostering growth and providing education using modern pedagogical approaches.</p>
              </div>
              <div className="absolute left-[-9px] md:left-1/2 md:-ml-2 w-5 h-5 bg-[#FF6B6B] rounded-full top-2 md:top-auto ring-4 ring-[#131313] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_#FF6B6B]"></div>
              <div className="md:w-1/2 md:pl-16">
                <span className="inline-block bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 rounded-full px-5 py-1.5 text-sm text-[#FFB3B0] font-label mb-2 md:mb-0 backdrop-blur-md">Jan 2023 - Present</span>
                <div className="md:hidden mt-4">
                  <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">Senior Faculty</h3>
                  <p className="text-[#FF6B6B] mt-1 font-label">TRC Education</p>
                  <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">Mentoring and leadership, fostering growth and providing education using modern pedagogical approaches.</p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative pl-8 md:pl-0 md:flex items-center group">
              <div className="md:w-1/2 md:pr-16 md:text-right">
                <span className="inline-block bg-[#4CD6FF]/10 border border-[#4CD6FF]/30 rounded-full px-5 py-1.5 text-sm text-[#4CD6FF] font-label mb-2 md:mb-0 backdrop-blur-md">Apr 2024 - Dec 2024</span>
                <div className="md:hidden mt-4">
                  <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">PDS Training</h3>
                  <p className="text-[#4CD6FF] mt-1 font-label">SUST</p>
                  <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">Comprehensive training in Python, Data Science, and fundamental algorithm design.</p>
                </div>
              </div>
              <div className="absolute left-[-9px] md:left-1/2 md:-ml-2 w-5 h-5 bg-[#4CD6FF] rounded-full top-2 md:top-auto ring-4 ring-[#131313] group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_#4CD6FF]"></div>
              <div className="hidden md:block md:w-1/2 pl-16 text-left">
                <h3 className="text-2xl font-bold text-[#E5E2E1] font-headline">PDS Training</h3>
                <p className="text-[#4CD6FF] mt-1 font-label">SUST</p>
                <p className="text-sm text-on-surface/60 font-light mt-3 leading-relaxed">Comprehensive training in Python, Data Science, and fundamental algorithm design.</p>
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
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">Tech <span className="text-[#FF6B6B]">Stack</span></h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">Tools and Technologies</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['HTML/CSS', 'JavaScript', 'React', 'MongoDB', 'MySQL', 'C/C++', 'Python', 'Pandas', 'Scikit-learn', 'Vite', 'Tailwind', 'Git'].map((skill) => (
              <div key={skill} className="js-skill-pill bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(255,107,107,0.2)] hover:-translate-y-1 transition-all cursor-default">
                <span className="text-[#E5E2E1] font-medium tracking-wide">{skill}</span>
              </div>
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
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">Featured <span className="text-[#4CD6FF]">Projects</span></h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Blood Love",
                desc: "A MERN stack application dedicated to facilitating blood donations efficiently.",
                tech: ["React", "JavaScript", "Vite", "SweetAlert2"],
                color: "text-[#FF6B6B]",
                image: "/proj-bloodlove.png",
                liveUrl: "https://candid-douhua-d628ca.netlify.app/"
              },
              {
                title: "Payoo Mobile",
                desc: "A mobile application interface project focused on clean UX and core wallet interactions.",
                tech: ["HTML", "CSS", "JavaScript"],
                color: "text-[#FFB3B0]",
                image: "/proj-payoo.png",
                liveUrl: "https://subrotochandashuvo.github.io/Payo-Mobile-Application/home.html"
              },
              {
                title: "Store of Applications",
                desc: "A dynamic web app for searching and downloading curated software effortlessly.",
                tech: ["React", "Tailwind CSS", "Vite"],
                color: "text-[#4CD6FF]",
                image: "/proj-storeofapplications.png",
                liveUrl: "https://flourishing-lily-5fb3c3.netlify.app/AllApps/23"
              },
              {
                title: "Paw Mart",
                desc: "An e-commerce themed project for showcasing pet products in an engaging storefront.",
                tech: ["HTML", "CSS", "JavaScript"],
                color: "text-[#4CD6FF]",
                image: "/proj-pawmart.png",
                liveUrl: "https://cosmic-melba-af77ae.netlify.app/"
              },
              {
                title: "Emergency Hotline",
                desc: "A hotline utility application built to improve emergency information access quickly.",
                tech: ["HTML", "CSS", "JavaScript"],
                color: "text-[#FF6B6B]",
                image: "/proj-emergency.png",
                liveUrl: "https://subrotochandashuvo.github.io/Emergency-Hotline/"
              }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                className="js-project-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-500 group shadow-2xl flex flex-col h-full hover:border-white/20"
                variants={projectReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.1 }}
              >
                <div className="w-full aspect-video bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/70 via-[#131313]/30 to-transparent"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className={`text-2xl font-bold font-headline ${project.color} mb-3`}>{project.title}</h3>
                  <p className="text-on-surface/70 font-light mb-8 flex-grow leading-relaxed">{project.desc}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-label bg-white/10 px-4 py-1.5 rounded-full text-white/90">{t}</span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-semibold transition-colors duration-300 text-sm">View Demo</a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/10 text-white rounded-full transition-colors duration-300">
                      <span className="material-symbols-outlined text-[20px]">code</span>
                    </a>
                  </div>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">Let's <span className="text-[#FFB3B0]">Connect</span></h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">Ready to start a project?</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFB3B0] via-[#FF6B6B] to-[#4CD6FF]"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-label text-white/70 ml-1">Your Name</label>
                  <input type="text" id="name" placeholder="John Doe" className="w-full bg-[#131313]/60 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-label text-white/70 ml-1">Email Address</label>
                  <input type="email" id="email" placeholder="john@example.com" className="w-full bg-[#131313]/60 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-label text-white/70 ml-1">Your Message</label>
                <textarea id="message" rows="5" placeholder="Tell me about your project..." className="w-full bg-[#131313]/60 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B6B] focus:ring-1 focus:ring-[#FF6B6B] transition-all resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-gradient-to-r from-[#FFB3B0] to-[#FF6B6B] text-on-primary-container py-4 rounded-xl font-bold shadow-[0_0_30px_rgba(255,107,107,0.2)] transform hover:translate-y-[-2px] active:translate-y-[1px] transition-all flex justify-center items-center gap-2">
                Send Message
                <span className="material-symbols-outlined text-lg">send</span>
              </button>
            </form>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="w-full border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md py-12 px-6 mt-20 relative z-40">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="font-headline italic font-bold tracking-tighter text-3xl opacity-90 mb-2">
                <span className="text-[#E5E2E1]">SUB</span>
                <span className="text-[#FF6B6B]">ROTO</span>
              </div>
              <p className="text-on-surface/50 text-sm font-light">Crafting digital experiences with love.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/subrotochanda.subrotochanda.3" target="_blank" rel="noopener noreferrer" aria-label="Facebook profile" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.91h-2.3V22C18.34 21.24 22 17.08 22 12.06z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/subroto-chanda-shuvo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#4CD6FF] hover:border-[#4CD6FF] transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 10.34H5.67V18H8.34V10.34M7 6.75A1.56 1.56 0 1 0 7 9.87A1.56 1.56 0 1 0 7 6.75M18.33 13.34C18.33 11 17.84 9.2 15.1 9.2C13.79 9.2 12.91 9.92 12.55 10.61H12.51V10.34H9.95V18H12.62V14.2C12.62 13.2 12.81 12.23 14.05 12.23C15.27 12.23 15.29 13.37 15.29 14.27V18H18V13.8L18.33 13.34Z" />
                </svg>
              </a>
              <a href="https://github.com/SubrotoChandaShuvo" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#7A8CFF] hover:border-[#7A8CFF] transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a href="mailto:subrotochandashuvo@gmail.com" aria-label="Send email" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FFB3B0] hover:border-[#FFB3B0] transition-all duration-300">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-on-surface/40 text-xs font-label">© {new Date().getFullYear()} Subroto Chanda Shuvo. All rights reserved.</p>
            <div className="flex gap-6 text-on-surface/40 text-xs font-label">
              <a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>

        {/* Social Icons Column (Fixed Left) */}
        <aside className="fixed bottom-12 left-6 flex flex-col gap-6 z-40 hidden md:flex">
          <a className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110" href="https://www.facebook.com/subrotochanda.subrotochanda.3" target="_blank" rel="noopener noreferrer" aria-label="Facebook profile">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.91h-2.3V22C18.34 21.24 22 17.08 22 12.06z" />
            </svg>
          </a>
          <a className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110" href="https://www.linkedin.com/in/subroto-chanda-shuvo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M8.34 10.34H5.67V18H8.34V10.34M7 6.75A1.56 1.56 0 1 0 7 9.87A1.56 1.56 0 1 0 7 6.75M18.33 13.34C18.33 11 17.84 9.2 15.1 9.2C13.79 9.2 12.91 9.92 12.55 10.61H12.51V10.34H9.95V18H12.62V14.2C12.62 13.2 12.81 12.23 14.05 12.23C15.27 12.23 15.29 13.37 15.29 14.27V18H18V13.8L18.33 13.34Z" />
            </svg>
          </a>
          <a className="text-on-surface/40 hover:text-[#7A8CFF] transition-transform hover:scale-110" href="https://github.com/SubrotoChandaShuvo" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110" href="mailto:subrotochandashuvo@gmail.com" aria-label="Send email">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
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
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white bg-black hover:bg-[#121212] shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.55)] active:scale-90 transition-all duration-300 border border-white/20"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
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


    </>
  );
}

export default App;
