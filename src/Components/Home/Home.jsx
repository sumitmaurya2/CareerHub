import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Briefcase, User, FileText, Mic, BookOpen, Map, Award, Users, 
  Search, Target, Zap, ChevronRight, CheckCircle2 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('candidate');
  const mainRef = useRef(null);
  const cursorRef = useRef(null);

  // Content (Unchanged)
  const candidateFeatures = [
    { icon: <FileText size={24} />, title: 'AI Resume Builder', desc: 'Upload or build from scratch. Paste a JD and let AI tailor keywords, rewrite weak lines, and boost your ATS score.' },
    { icon: <Mic size={24} />, title: 'Mock Interview & Debate', desc: 'AI roleplays as technical, HR, or behavioral interviewers. Practice arguments and get instant feedback.' },
    { icon: <BookOpen size={24} />, title: 'PYQ & Smart Prep', desc: 'Domain-specific previous year questions. Filter by year and get direct AI explanations.' },
    { icon: <Map size={24} />, title: 'Visual Career Roadmaps', desc: 'Step-by-step guides for Full Stack, Data Science, etc. Find the path that fits your exact skills.' },
    { icon: <Award size={24} />, title: 'Verified Freelance', desc: 'Work on real client projects. Earn a verified certificate and a killer portfolio entry.' },
    { icon: <Users size={24} />, title: 'Tech Community', desc: 'Document your learning journey. Connect strictly on technical topics with seniors and peers.' },
  ];

  const employerFeatures = [
    { icon: <Briefcase size={24} />, title: 'Managed Project Delivery', desc: 'Post your project, budget, and timeline. We act as your service agency and deliver the output.' },
    { icon: <Search size={24} />, title: 'AI-Matched Talent', desc: 'Want to hire directly? Our AI surfaces the best profiles based on verified resume scores.' },
    { icon: <Target size={24} />, title: 'Seamless Hiring Pipeline', desc: 'Did a student nail your project? Offer them an internship or full-time role directly risk-free.' },
  ];

  const extraIdeas = [
    { title: 'Public Skill Passport', desc: 'A unified score generated from projects, blogs, and mock interviews.' },
    { title: 'AI Resume Roast', desc: 'Brutally honest, viral-worthy feedback on your resume.' },
    { title: 'Cohort Learning', desc: 'Follow roadmaps in batches with built-in accountability partners.' },
    { title: 'Mentor Marketplace', desc: 'Book 1:1 paid sessions with senior industry professionals.' }
  ];

  // Custom Cursor Logic
  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.2, ease: "power2.out" });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Hero Expanding Image
      gsap.to('.hero-image-container', {
        width: '100%',
        borderRadius: '0px',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 2. Inner Image Parallax (Moving the image inside the container)
      gsap.to('.hero-image-inner', {
        scale: 1.2,
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // 3. List Item Reveals (Fade and slide up)
      gsap.utils.toArray('.list-item').forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            }
          }
        );
      });

      // 4. Parallax Text
      gsap.utils.toArray('[data-speed]').forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed'));
        gsap.to(el, {
          y: () => (ScrollTrigger.maxScroll(window) * speed),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, [activeTab]);

  const activeFeatures = activeTab === 'candidate' ? candidateFeatures : employerFeatures;

  return (
    <div ref={mainRef} className="bg-[#111111] text-[#E7E7E8] font-sans selection:bg-[#E7E7E8] selection:text-[#111111]">
      
      {/* Custom Cursor */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-4 h-4 bg-[#E7E7E8] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      <style>{`
        body { cursor: none; }
        ::-webkit-scrollbar { width: 0px; } /* Hidden scrollbar for cinematic feel */
      `}</style>

      {/* The Main Content Wrapper (Used to overlap the footer) */}
      <div className="relative z-10 bg-[#111111] mb-[100vh] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* --- HERO SECTION --- */}
        <section className="hero-wrapper relative min-h-screen pt-32 pb-20 flex flex-col items-center">
          <div className="text-center px-4 mb-12">
            <p className="text-sm tracking-[0.3em] uppercase mb-6 text-gray-400">Welcome to the Ultimate Career OS</p>
            <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-6 leading-[1.1]">
              Engineer your<br/>entire career.
            </h1>
            <p className="text-lg text-gray-400 max-w-xl mx-auto font-light">
              Not another job board. A complete ecosystem where talent grows, verifies skills on real projects, and top companies hire without the noise.
            </p>
          </div>

          {/* Expanding Parallax Image */}
          <div className="hero-image-container w-full h-[60vh] md:h-[70vh] rounded-[0px] overflow-hidden relative mt-10">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" 
              alt="Creative Team" 
              className="hero-image-inner absolute inset-0 w-full h-[130%] object-cover origin-top"
            />
          </div>
        </section>

        {/* --- FEATURE TOGGLE & LIST SECTION --- */}
       <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto text-white">
      
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10 mb-24 border-b border-zinc-800 pb-12">
        
        {/* Heading */}
        <h2 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[1.05] max-w-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          {activeTab === 'candidate' ? 'Level up from Learner.' : 'Hire Proven Talent.'}
        </h2>
        
        {/* Toggle */}
        <div className="flex items-center gap-1 bg-zinc-900/50 border border-zinc-800/80 rounded-full p-1.5 backdrop-blur-xl shadow-2xl">
          
          <button 
            onClick={() => setActiveTab('candidate')}
            className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
              activeTab === 'candidate'
                ? 'text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {activeTab === 'candidate' && (
              <span className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500" />
            )}
            For Students
          </button>

          <button 
            onClick={() => setActiveTab('employer')}
            className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
              activeTab === 'employer'
                ? 'text-black'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {activeTab === 'employer' && (
              <span className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-500" />
            )}
            For Employers
          </button>

        </div>
      </div>

      {/* Minimalist List */}
      <div className="flex flex-col">
        {activeFeatures.map((feature, idx) => (
          <div 
            key={idx} 
            className="group flex flex-col md:flex-row items-start md:items-center py-12 border-b border-zinc-800/80 hover:border-zinc-500 transition-colors duration-500 cursor-pointer"
          >
            
            {/* Number */}
            <div className="md:w-1/12 text-zinc-600 font-light text-2xl mb-4 md:mb-0 group-hover:text-white transition-colors duration-500">
              0{idx + 1}
            </div>
            
            {/* Title & Icon */}
            <div className="md:w-4/12 flex items-center gap-6 mb-4 md:mb-0 transform group-hover:translate-x-2 transition-transform duration-500">
              <div className="w-14 h-14 rounded-full border border-zinc-700/50 flex items-center justify-center group-hover:bg-white group-hover:border-white group-hover:text-black transition-all duration-500">
                {React.cloneElement(feature.icon, { 
                  size: 24, 
                  className: 'transition-transform duration-500 group-hover:scale-110' 
                })}
              </div>
              <h3 className="text-3xl md:text-4xl font-normal tracking-tight text-zinc-100">
                {feature.title}
              </h3>
            </div>

            {/* Description */}
            <div className="md:w-7/12 md:pl-16 text-zinc-400 text-lg leading-relaxed font-light transform group-hover:translate-x-2 transition-transform duration-500">
              {feature.desc}
            </div>

          </div>
        ))}
      </div>
    </section>

        {/* --- X-FACTORS SECTION (Dark / Immersive) --- */}
        <section className="py-40 px-6 md:px-12 relative overflow-hidden bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
            
            <div className="md:w-1/3 z-10">
              <p className="text-sm tracking-[0.2em] uppercase text-gray-500 mb-6">The Platform</p>
              <h2 className="text-5xl md:text-7xl font-medium leading-[1.1] mb-8">X-Factors</h2>
              <p className="text-xl text-gray-400 font-light">Unique features that make our ecosystem the most powerful career accelerator on the internet.</p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-20 z-10">
              {extraIdeas.map((idea, idx) => (
                <div key={idx} className="list-item flex flex-col">
                  <div className="mb-6 opacity-50">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-medium mb-4">{idea.title}</h4>
                  <p className="text-gray-400 leading-relaxed font-light">{idea.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Abstract background typography moving slowly */}
          <div 
            data-speed="0.1" 
            className="absolute top-1/2 left-0 text-[15vw] font-bold text-white/[0.02] whitespace-nowrap pointer-events-none -translate-y-1/2"
          >
            ECOSYSTEM ECOSYSTEM ECOSYSTEM
          </div>
        </section>
      </div>

      {/* --- FOOTER / CTA REVEAL --- */}
      {/* This is fixed to the bottom of the screen, and the main content scrolls past it to reveal it */}
      <footer className="fixed bottom-0 left-0 w-full h-screen bg-[#E7E7E8] text-[#111111] z-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="text-sm tracking-[0.2em] uppercase font-bold text-gray-500 mb-8">Next Steps</p>
        <h2 className="text-6xl md:text-9xl font-medium tracking-tight mb-16 max-w-5xl leading-[0.9]">
          Ready to change how careers are built?
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <button className="px-10 py-5 bg-[#111111] text-white rounded-full text-lg hover:scale-105 transition-transform duration-300 flex items-center gap-3">
            Start as a Candidate <ChevronRight size={20} />
          </button>
          <button className="px-10 py-5 bg-transparent border border-[#111111] text-[#111111] rounded-full text-lg hover:bg-[#111111] hover:text-white transition-colors duration-300 flex items-center gap-3">
            Post a Project / Hire <ChevronRight size={20} />
          </button>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;