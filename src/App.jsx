import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Lenis from 'lenis';

function App() {
  const bgRingRef = useRef(null);
  const cyanRingRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Continuous GSAP Floating Animations
    gsap.to(bgRingRef.current, {
      y: -25,
      rotation: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(cyanRingRef.current, {
      y: 25,
      rotation: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
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
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
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

      <main className="relative min-h-screen pt-20 pb-32 px-6 overflow-hidden flex flex-col items-center">
        {/* Background Decorative Elements */}
        <div ref={bgRingRef} className="absolute top-[20%] -right-20 w-64 h-64 border-2 border-[#FF6B6B] rounded-full opacity-20 pointer-events-none"></div>
        <div ref={cyanRingRef} className="absolute top-[40%] -left-10 w-32 h-32 bg-[#4CD6FF] rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24 mt-8 lg:mt-20">
          {/* Hero Image Container with Layering */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-md lg:max-w-none lg:w-1/2 aspect-[4/5] mb-12 lg:mb-0"
          >
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
          </motion.div>

          {/* Content Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-center lg:text-left w-full lg:w-1/2 space-y-8 relative z-20 flex flex-col items-center lg:items-start"
          >
            <div>
              <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-tight tracking-tight">
                Hi, I'm <br className="hidden lg:block"/>
                <span className="text-[#FF6B6B]">Subroto Chanda Shuvo</span>
              </h1>
              <p className="text-xl lg:text-2xl font-body text-on-surface/80 mt-4 font-light">
                User Interface Designer
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
                Computer Science Engineering student at Metropolitan University with a strong focus on frontend development and leadership. Solid foundation in modern web technologies.
              </p>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24 mt-24 pt-24 px-6 md:px-0 scroll-mt-20">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#FF6B6B] mb-6">Discover who I am.</h2>
            <p className="text-on-surface/80 leading-relaxed text-lg mb-6 font-light">
              I am a Computer Science and Engineering student at Metropolitan University, Sylhet, with a strong focus on frontend development and experience in leadership and education. I specialize in building stunning, responsive web applications utilizing modern frameworks like React and Tailwind CSS.
            </p>
            <p className="text-on-surface/80 leading-relaxed text-lg font-light">
              I possess a solid foundation in modern web technologies and have additionally trained in Data Science and Machine Learning, allowing me to blend deep technical expertise with creative, user-centric design solutions.
            </p>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6 p-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-2xl hover:bg-white/10 transition-colors">
              <span className="text-5xl font-headline font-bold text-[#FFB3B0]">1+</span>
              <span className="text-xs text-on-surface/60 uppercase tracking-widest mt-4">Year Exp</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center shadow-2xl hover:bg-white/10 transition-colors translate-y-12">
              <span className="text-5xl font-headline font-bold text-[#4CD6FF]">12+</span>
              <span className="text-xs text-on-surface/60 uppercase tracking-widest mt-4">Projects</span>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="relative w-full max-w-4xl mx-auto mt-40 pt-24 px-6 md:px-0 scroll-mt-20">
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
        </section>

        {/* Tech Stack & Skills Section */}
        <section id="skills" className="relative w-full max-w-6xl mx-auto mt-40 pt-24 px-6 md:px-0 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">Tech <span className="text-[#FF6B6B]">Stack</span></h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">Tools and Technologies</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['HTML/CSS', 'JavaScript', 'React', 'MongoDB', 'MySQL', 'C/C++', 'Python', 'Pandas', 'Scikit-learn', 'Vite', 'Tailwind', 'Git'].map((skill) => (
              <div key={skill} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(255,107,107,0.2)] hover:-translate-y-1 transition-all cursor-default">
                <span className="text-[#E5E2E1] font-medium tracking-wide">{skill}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative w-full max-w-6xl mx-auto mt-40 pt-24 px-6 md:px-0 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2e1]">Featured <span className="text-[#4CD6FF]">Projects</span></h2>
            <p className="text-on-surface/60 mt-4 text-sm tracking-widest uppercase font-label">Some of my recent work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "BloodLove", desc: "A MERN stack application dedicated to facilitating blood donations efficiently.", tech: ["React", "JavaScript", "Vite", "SweetAlert2"], color: "text-[#FF6B6B]" },
              { title: "Store of Applications", desc: "A dynamic web app for searching and downloading curated software effortlessly.", tech: ["React", "Tailwind CSS", "Vite"], color: "text-[#4CD6FF]" },
              { title: "Personal Portfolio", desc: "My modern, glassmorphism-styled personal portfolio.", tech: ["React", "Tailwind CSS"], color: "text-[#FFB3B0]" }
            ].map((project, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-500 group shadow-2xl flex flex-col h-full hover:border-white/20">
                <div className="w-full aspect-video bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5">
                  <span className="material-symbols-outlined text-5xl text-white/20 group-hover:scale-125 transition-transform duration-700">imagesmode</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent opacity-90"></div>
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
                    <a href="#" className="flex-1 text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-full font-semibold transition-colors duration-300 text-sm">View Demo</a>
                    <a href="#" className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-white/20 border border-white/10 text-white rounded-full transition-colors duration-300">
                      <span className="material-symbols-outlined text-[20px]">code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative w-full max-w-4xl mx-auto mt-40 pt-24 px-6 md:px-0 mb-40 scroll-mt-20">
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
        </section>

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
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FF6B6B] hover:border-[#FF6B6B] transition-all duration-300">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#4CD6FF] hover:border-[#4CD6FF] transition-all duration-300">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FFB3B0] hover:border-[#FFB3B0] transition-all duration-300">
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
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
          <a className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110" href="#">
            <i className="material-symbols-outlined">public</i>
          </a>
          <a className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110" href="#">
            <i className="material-symbols-outlined">share</i>
          </a>
          <a className="text-on-surface/40 hover:text-tertiary transition-transform hover:scale-110" href="#">
            <i className="material-symbols-outlined">alternate_email</i>
          </a>
        </aside>

        {/* Floating Chat Action */}
        <div className="fixed bottom-10 right-6 z-50">
          <button className="bg-[#FF6B6B] hover:bg-[#ff5555] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 group active:scale-90 transition-all duration-300">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
            <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 font-bold text-sm whitespace-nowrap">Let's Chat</span>
          </button>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-8 w-full flex justify-center z-50">
        <div className="bg-[#0E0E0E]/80 backdrop-blur-xl border border-white/5 rounded-full px-6 py-3 w-max flex gap-8 shadow-2xl items-center">
          <a className="bg-gradient-to-br from-[#FFB3B0] to-[#FF6B6B] text-black rounded-full p-2 scale-110 transition-transform hover:scale-125 shadow-lg" href="#">
            <span className="material-symbols-outlined">public</span>
          </a>
          <a className="text-[#E5E2E1]/50 p-2 hover:text-[#FFB3B0] transition-colors" href="#">
            <span className="material-symbols-outlined">share</span>
          </a>
          <a className="text-[#E5E2E1]/50 p-2 hover:text-[#FFB3B0] transition-colors" href="#">
            <span className="material-symbols-outlined">grid_view</span>
          </a>
          <a className="text-[#E5E2E1]/50 p-2 hover:text-[#FFB3B0] transition-colors" href="#">
            <span className="material-symbols-outlined">mail</span>
          </a>
        </div>
      </nav>
    </>
  );
}

export default App;
