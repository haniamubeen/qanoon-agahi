import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Shield, Target, Eye, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-16 bg-brand-50 dark:bg-dark-bg min-h-screen">

      {/* Hero */}
      <section className="py-20 px-4 bg-brand-50 dark:bg-dark-surface">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm font-semibold mb-6 border border-accent-100 dark:border-accent-800/50">
            <Scale size={16} />
            <span>About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
            Making Legal Rights <span className="text-accent-600 dark:text-accent-400">Accessible to All</span>
          </h1>
          <p className="text-lg text-brand-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            AI Legal Right Awareness is a Final Year Project born from a simple yet powerful idea: every Pakistani citizen deserves to understand their legal rights, regardless of their background, language, or financial status.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-brand-50 dark:bg-dark-surface p-10 rounded-2xl border border-brand-100 dark:border-dark-border shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mb-6">
              <Target className="text-accent-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-brand-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-brand-600 dark:text-slate-400 leading-relaxed">
              To democratize access to legal knowledge across Pakistan by leveraging cutting-edge AI technology. We believe that understanding one's rights should not be a privilege reserved for those who can afford expensive legal consultations. Our platform bridges the gap between complex legal jargon and everyday understanding, providing structured, actionable guidance in both English and Urdu.
            </p>
          </div>
          <div className="bg-brand-50 dark:bg-dark-surface p-10 rounded-2xl border border-brand-100 dark:border-dark-border shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mb-6">
              <Eye className="text-accent-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-brand-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-brand-600 dark:text-slate-400 leading-relaxed">
              We envision a Pakistan where every citizen is empowered with legal awareness. A country where a farmer in rural Sindh can understand land ownership laws, a student in Lahore can learn about consumer protection rights, and a small business owner in Peshawar can navigate commercial regulations — all through an intuitive, privacy-first AI platform that speaks their language.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 px-4 bg-brand-50 dark:bg-dark-surface">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-brand-900 dark:text-white mb-4">What Makes Us Different</h2>
          <p className="text-brand-600 dark:text-slate-400">Built with purpose. Designed with care.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: Shield, title: "100% Private", desc: "All AI processing runs locally. Your legal queries never leave your device — zero data collection, zero tracking." },
            { icon: Heart, title: "Bilingual Support", desc: "Ask questions in Urdu or English. Our system understands both and provides structured, clear answers in your language." },
            { icon: Scale, title: "Grounded in Law", desc: "Powered by the Constitution of Pakistan, verified legal FAQs, and curated case references — not random internet data." },
          ].map((item, idx) => (
            <div key={idx} className="bg-brand-50 dark:bg-dark-card p-8 rounded-2xl border border-brand-100 dark:border-dark-border shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mb-5 mx-auto">
                <item.icon className="text-accent-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-sm text-brand-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-brand-900 dark:text-white mb-6">Ready to explore?</h2>
          <p className="text-lg text-brand-600 dark:text-slate-400 mb-8">Try the interactive demo and see how we simplify legal awareness.</p>
          <Link to="/demo" className="inline-flex items-center gap-2 bg-accent-600 hover:bg-accent-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent-500/30">
            Try Interactive Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
