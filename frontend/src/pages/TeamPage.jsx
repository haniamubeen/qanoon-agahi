import React from 'react';
import { Code2, Database, FileSearch, BookOpen, Palette, ClipboardList, FlaskConical, ShieldCheck } from 'lucide-react';

const teamMembers = [
  {
    name: "Hania Mubeen",
    role: "Team Lead",
    tags: ["Backend Development", "Logic & Architecture"],
    bio: "Leads the project vision and drives the core backend architecture. Responsible for implementing the RAG pipeline logic, API design, and ensuring all system components integrate seamlessly.",
    icon: Code2,
    color: "accent",
  },
  {
    name: "Soha Mubin",
    role: "Research Lead & Frontend Developer",
    tags: ["Data Extraction", "Online Research", "Frontend Design"],
    bio: "Spearheads the research efforts, sourcing and curating legal data from verified online sources including the Constitution of Pakistan, legal FAQs, and case law databases for the knowledge base.",
    icon: FileSearch,
    color: "amber",
  },
  {
    name: "Suhaira Shafique",
    role: "Backend Developer & QA",
    tags: ["Backend Coding", "Data Verification", "Documentation"],
    bio: "Builds and maintains backend services alongside data verification workflows. Ensures the accuracy and integrity of the legal knowledge base while maintaining comprehensive project documentation.",
    icon: Database,
    color: "violet",
  },
  {
    name: "Areebaa Shakeel",
    role: "Documentation & Frontend Designer",
    tags: ["Documentation", "Research Support", "Log Management", "Frontend Designer"],
    bio: "Manages project documentation, maintains development logs, supports research efforts, and contributes to the frontend UI design — ensuring the platform is both well-documented and visually polished.",
    icon: Palette,
    color: "rose",
  },
];

const colorMap = {
  accent: { bg: "bg-accent-50 dark:bg-accent-900/20", text: "text-accent-600 dark:text-accent-400", border: "border-accent-200 dark:border-accent-800/40", tagBg: "bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", border: "border-amber-200 dark:border-amber-800/40", tagBg: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  violet: { bg: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-600 dark:text-violet-400", border: "border-violet-200 dark:border-violet-800/40", tagBg: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300" },
  rose: { bg: "bg-rose-50 dark:bg-rose-900/20", text: "text-rose-600 dark:text-rose-400", border: "border-rose-200 dark:border-rose-800/40", tagBg: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300" },
};

export default function TeamPage() {
  return (
    <div className="pt-16 bg-brand-50 dark:bg-dark-bg min-h-screen">

      {/* Header */}
      <section className="py-20 px-4 bg-brand-50 dark:bg-dark-surface">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold text-accent-600 dark:text-accent-400 uppercase tracking-wider mb-3">The People Behind the Platform</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-900 dark:text-white tracking-tight mb-6">Meet Our Team</h1>
          <p className="text-lg text-brand-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We are a team of passionate university students building AI Legal Right Awareness as our Final Year Project — driven by the belief that legal knowledge should be accessible to everyone.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, idx) => {
            const colors = colorMap[member.color];
            return (
              <div key={idx} className="bg-brand-50 dark:bg-dark-surface rounded-2xl border border-brand-100 dark:border-dark-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">

                {/* Color Top Bar */}
                <div className={`h-1.5 ${colors.bg.replace('bg-', 'bg-').replace('/20', '')} ${colors.text.includes('accent') ? 'bg-accent-500' : member.color === 'amber' ? 'bg-amber-500' : member.color === 'violet' ? 'bg-violet-500' : 'bg-rose-500'}`}></div>

                <div className="p-8">
                  <div className="flex items-start gap-5">
                    {/* Icon Avatar */}
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0 border ${colors.border}`}>
                      <member.icon className={colors.text} size={26} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-brand-900 dark:text-white">{member.name}</h3>
                      <p className={`text-sm font-semibold ${colors.text} mb-3`}>{member.role}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {member.tags.map((tag, i) => (
                          <span key={i} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${colors.tagBg}`}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-brand-600 dark:text-slate-400 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
