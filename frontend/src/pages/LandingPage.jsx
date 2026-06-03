import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Shield, Zap, Users, MessageSquare, Scale, Briefcase, GraduationCap } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen pt-16 bg-brand-50 dark:bg-dark-bg">

      {/* ═══ 1. Hero Section ═══ */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <ScrollReveal animation="fade-left" className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm font-semibold mb-6 border border-accent-100 dark:border-accent-800/50">
              <Zap size={16} />
              <span>Revolutionizing Assistance with AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
              Smart Legal Insights. <br className="hidden lg:block" />
              <span className="text-accent-600 dark:text-accent-400">Zero Hallucinations.</span>
            </h1>
            <p className="text-lg sm:text-xl text-brand-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the power of advanced local AI designed for the Pakistani legal landscape. Instant insights, document generation, and powerful workflow tools—completely private and secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="inline-flex justify-center items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-500/30">
                Try For Free <ArrowRight size={18} />
              </Link>
              <Link to="/demo" className="inline-flex justify-center items-center gap-2 bg-brand-50 dark:bg-dark-surface border-2 border-brand-200 dark:border-dark-border hover:border-brand-300 dark:hover:border-slate-700 text-brand-800 dark:text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:bg-brand-100 dark:hover:bg-dark-card">
                Interactive Demo
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-right" delay={200} className="lg:col-span-6 relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 dark:from-dark-surface dark:to-dark-bg border border-brand-200 dark:border-dark-border shadow-2xl p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-400/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-brand-50 dark:bg-dark-card p-4 rounded-xl shadow-sm border border-brand-100 dark:border-dark-border/50 max-w-[80%]">
                  <p className="text-sm font-medium text-brand-800 dark:text-slate-200">What are the required documents for property transfer?</p>
                </div>
                <div className="flex justify-end">
                  <div className="bg-brand-50 dark:bg-brand-900/30 p-5 rounded-xl border border-brand-100 dark:border-dark-border/50 max-w-[90%]">
                    <div className="flex items-center gap-2 mb-3">
                      <Bot size={18} className="text-accent-600" />
                      <span className="text-sm font-bold text-brand-900 dark:text-white">AI Assistant</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-brand-200 dark:bg-dark-border rounded w-full"></div>
                      <div className="h-2 bg-brand-200 dark:bg-dark-border rounded w-5/6"></div>
                      <div className="h-2 bg-brand-200 dark:bg-dark-border rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ 2. About Section ═══ */}
      <section className="bg-brand-50 dark:bg-dark-surface py-20 px-4">
        <ScrollReveal animation="blur" className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-900 dark:text-white mb-6">More Than Just a Chatbot</h2>
          <p className="text-lg text-brand-600 dark:text-slate-400 leading-relaxed">
            This isn't merely a search tool. It is a transformative intelligence platform designed to automate workflows, accelerate complex legal research, and bring unprecedented clarity to the Pakistani legal framework. We bridge the gap between complex legal jargon and actionable insights.
          </p>
        </ScrollReveal>
      </section>

      {/* ═══ 3. Target Audience Grid ═══ */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <ScrollReveal animation="fade-up" className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-2">Who is this for?</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-900 dark:text-white">Our Mission: Access. Simplified.</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Individuals", icon: UserIcon, desc: "Get instant answers to everyday legal questions without hefty consultation fees." },
            { title: "Students", icon: GraduationCap, desc: "Accelerate your research and understand complex case laws and statutes easily." },
            { title: "Professionals", icon: Briefcase, desc: "Draft documents and verify compliance quickly to streamline your business." },
            { title: "Law Firms", icon: Scale, desc: "Automate initial client intake and drastically reduce research hours." }
          ].map((persona, idx) => (
            <ScrollReveal key={idx} animation="zoom" delay={idx * 120}>
              <div className="bg-brand-50 dark:bg-dark-surface p-8 rounded-2xl border border-brand-100 dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full">
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-dark-bg flex items-center justify-center mb-6 group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 transition-colors">
                  <persona.icon className="text-brand-700 dark:text-slate-300 group-hover:text-accent-600 dark:group-hover:text-accent-400" size={24} />
                </div>
                <h4 className="text-xl font-bold text-brand-900 dark:text-white mb-3">{persona.title}</h4>
                <p className="text-brand-600 dark:text-slate-400 text-sm leading-relaxed">{persona.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ 4. Features Bento Box ═══ */}
      <section className="bg-brand-900 dark:bg-black py-24 px-4 text-white">
        <div className="max-w-7xl mx-auto w-full">
          <ScrollReveal animation="fade-down" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Why Choose AI Legal?</h2>
            <p className="text-brand-300 max-w-2xl mx-auto">Built from the ground up to serve the specific needs of the local legal ecosystem.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: MessageSquare, title: "Always-On Partner", desc: "24/7 availability with context-aware support. Ask questions anytime, anywhere, in English or Urdu.", anim: "fade-left" },
              { icon: Zap, title: "Fast, Actionable Answers", desc: "We strip away complex jargon. Receive structured, step-by-step guidance instead of walls of text.", anim: "fade-right" },
              { icon: Users, title: "Smarter Help, No High Fees", desc: "Democratizing access to legal knowledge with transparent, cost-effective infrastructure.", anim: "fade-left" },
              { icon: Shield, title: "Privacy You Can Trust", desc: "Robust encryption and strict confidentiality. 100% local inference ensures your data never leaves the ecosystem.", anim: "fade-right" },
            ].map((feat, idx) => (
              <ScrollReveal key={idx} animation={feat.anim} delay={idx * 100}>
                <div className="bg-brand-800/50 dark:bg-dark-surface border border-brand-700 dark:border-dark-border p-8 rounded-3xl backdrop-blur-sm h-full">
                  <feat.icon className="text-accent-400 mb-6" size={32} />
                  <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-brand-300">{feat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>



      {/* ═══ 6. Testimonials ═══ */}
      <section className="py-24 px-4 bg-brand-50 dark:bg-dark-bg overflow-hidden">
        <div className="max-w-7xl mx-auto w-full">
          <ScrollReveal animation="blur" className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 dark:text-white">Wall of Love</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "It completely changed how I do my initial case research. What took hours now takes minutes.", name: "Ahmed R.", role: "Senior Partner" },
              { quote: "The Urdu translation feature is a lifesaver for helping my local clients understand their rights.", name: "Fatima S.", role: "Legal Consultant" },
              { quote: "As a law student, having this AI to summarize complex acts has boosted my productivity tenfold.", name: "Usman K.", role: "Law Student" }
            ].map((testimonial, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                <div className="bg-brand-50 dark:bg-dark-surface p-8 rounded-2xl shadow-sm border border-brand-100 dark:border-dark-border h-full">
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-brand-700 dark:text-slate-300 italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-bold text-brand-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-brand-500 dark:text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. Bottom CTA ═══ */}
      <section className="py-24 px-4">
        <ScrollReveal animation="zoom">
          <div className="max-w-4xl mx-auto w-full bg-gradient-to-br from-brand-100 to-brand-50 dark:from-dark-surface dark:to-dark-bg border border-brand-200 dark:border-dark-border rounded-3xl p-12 text-center shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-900 dark:text-white mb-6">Simplify your journey.</h2>
            <p className="text-xl text-brand-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
              Try our intuitive tools today and experience the next generation of legal assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/register" className="w-full sm:w-auto bg-brand-900 hover:bg-brand-800 dark:bg-white dark:hover:bg-brand-50 text-white dark:text-brand-900 px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95">
                Start Your Freemium &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}

function UserIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
