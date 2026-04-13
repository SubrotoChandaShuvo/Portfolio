import React from 'react';

function App() {
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
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Experience</a>
            <a href="#" className="hover:text-white transition-colors">Skills</a>
            <a href="#" className="hover:text-white transition-colors">Projects</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </nav>

          {/* Action Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block font-label text-sm font-semibold text-white border border-white/30 rounded-full px-6 py-2 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 shadow-lg">
              Resume
            </button>
            <span className="material-symbols-outlined lg:hidden text-white cursor-pointer hover:opacity-80">menu</span>
          </div>
        </header>
      </div>

      <main className="relative min-h-screen pt-20 pb-32 px-6 overflow-hidden flex flex-col items-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-[20%] -right-20 w-64 h-64 border-2 border-[#FF6B6B] rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute top-[40%] -left-10 w-32 h-32 bg-[#4CD6FF] rounded-full mix-blend-screen filter blur-3xl opacity-20 pointer-events-none"></div>

        {/* Hero Section */}
        <section className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-24 mt-8 lg:mt-20">
          {/* Hero Image Container with Layering */}
          <div className="relative w-full max-w-md lg:max-w-none lg:w-1/2 aspect-[4/5] mb-12 lg:mb-0">
            {/* Cyan Geometric Accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-tertiary rounded-full pointer-events-none opacity-40"></div>
            
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(255,107,107,0.15)] relative z-10 transition-transform duration-500 hover:scale-[1.02]">
              <img 
                alt="Elegant portrait of Subroto Chanda Shuvo" 
                className="w-full h-full object-cover" 
                src="/profile.jpg"
              />
            </div>
            
            {/* Floating Decorative Coral Ring */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 border-[12px] border-[#FF6B6B]/15 rounded-full pointer-events-none lg:translate-x-12 lg:translate-y-12"></div>
          </div>

          {/* Content Area */}
          <div className="text-center lg:text-left w-full lg:w-1/2 space-y-8 relative z-20 flex flex-col items-center lg:items-start">
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
              
              <a className="flex items-center gap-2 text-on-surface/60 hover:text-[#FFB3B0] transition-colors py-2 group" href="#">
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
                Based in Netherland i'm developer and UI/UX designer. Hey are looking for designer to build your brand and grow your business? let's shake hands with me.
              </p>
            </div>
          </div>
        </section>

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
