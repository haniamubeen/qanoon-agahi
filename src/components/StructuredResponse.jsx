import React from 'react';
import { FileText, Scale, MapPin, ListChecks, Bot, ExternalLink } from 'lucide-react';

const mockData = {
  summary:
    'Based on the Transfer of Property Act 1882 and current Pakistani land registration laws, transferring property ownership requires biometric verification at a Sub-Registrar office. The process is standardized across provinces but timeframes may vary.',
  documents: [
    'Original Title Deed (Fard-e-Malkiat)',
    'Valid CNIC of Buyer and Seller',
    'FBR NTN Certificate',
    'Stamp Duty Receipt (from National Bank)',
    'Property Tax Clearance Certificate',
  ],
  lawyerType: 'Property / Civil Lawyer',
  court: 'Civil Court (Sub-Registrar Office)',
  steps: [
    { title: 'Get Agreement Drafted',   detail: 'Draft the Sale Deed on Rs. 1000+ official stamp paper via a licensed scribe.' },
    { title: 'Pay All Dues',            detail: 'Pay applicable stamp duties (2-3% of property value), CVT, and any outstanding property taxes.' },
    { title: 'Biometric Verification',  detail: 'Appear before the Sub-Registrar with both parties for NADRA biometric identification.' },
    { title: 'Receive Registered Deed', detail: 'Collect the stamped, registered deed — the legal proof of ownership transfer.' },
  ],
};

function Section({ icon: Icon, iconColor, title, children }) {
  return (
    <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
      <h3 className={`font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 text-[0.95rem] uppercase tracking-wide`}>
        <Icon size={17} className={iconColor} />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function StructuredResponse() {
  return (
    <div className="animate-slide-up w-full flex flex-col gap-4">

      {/* AI badge */}
      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-dark-muted font-medium">
        <div className="w-7 h-7 rounded-full bg-forest-100 dark:bg-forest-900/50 flex items-center justify-center flex-shrink-0">
          <Bot size={14} className="text-forest-700 dark:text-forest-400" />
        </div>
        <span>Qanoon AI · based on Pakistani law corpus</span>
      </div>

      {/* Summary card */}
      <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 shadow-sm">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[0.95rem]">
          {mockData.summary}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1 mt-3 text-xs text-forest-700 dark:text-forest-400 font-semibold hover:underline"
        >
          View source: Transfer of Property Act 1882 <ExternalLink size={11} />
        </a>
      </div>

      {/* 2-col grid: Documents + Lawyer & Court */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Documents */}
        <Section icon={FileText} iconColor="text-amber-500" title="Required Documents">
          <ul className="space-y-2">
            {mockData.documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300 text-sm leading-snug">
                <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 dark:text-amber-400 text-[10px] font-bold">{i + 1}</span>
                </div>
                {doc}
              </li>
            ))}
          </ul>
        </Section>

        {/* Lawyer + Court stacked */}
        <div className="flex flex-col gap-4">
          {/* Lawyer */}
          <div className="flex-1 bg-forest-50 dark:bg-forest-950/50 border border-forest-100 dark:border-forest-800/50 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[0.65rem] uppercase font-bold tracking-widest text-forest-600 dark:text-forest-400 mb-1">
                Type of Lawyer
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-tight">
                {mockData.lawyerType}
              </span>
            </div>
            <div className="bg-forest-100 dark:bg-forest-900/60 p-3 rounded-xl flex-shrink-0">
              <Scale size={22} className="text-forest-700 dark:text-forest-400" />
            </div>
          </div>

          {/* Court */}
          <div className="flex-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/40 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[0.65rem] uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                Appropriate Court
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-tight">
                {mockData.court}
              </span>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-xl flex-shrink-0">
              <MapPin size={22} className="text-amber-700 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps — vertical timeline */}
      <Section icon={ListChecks} iconColor="text-forest-600 dark:text-forest-400" title="Next Steps">
        <ol className="relative flex flex-col gap-0">
          {mockData.steps.map((step, i) => (
            <li key={i} className="flex gap-4 relative pb-5 last:pb-0">
              {/* Vertical connector line */}
              {i < mockData.steps.length - 1 && (
                <div className="absolute left-[13px] top-7 bottom-0 w-px bg-forest-100 dark:bg-forest-800" />
              )}
              {/* Step number bubble */}
              <div className="w-7 h-7 rounded-full bg-forest-100 dark:bg-forest-900/60 text-forest-800 dark:text-forest-300 font-bold flex items-center justify-center flex-shrink-0 text-xs z-10">
                {i + 1}
              </div>
              <div className="pt-0.5">
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-[0.9rem] leading-tight mb-0.5">
                  {step.title}
                </p>
                <p className="text-slate-500 dark:text-dark-muted text-sm leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Disclaimer footer */}
      <p className="text-xs text-slate-400 dark:text-dark-muted text-center px-4 leading-relaxed">
        ⚠️ This is an educational summary based on publicly available Pakistani law. It is not legal advice.
        <br />Always consult a qualified lawyer for your specific situation.
      </p>

    </div>
  );
}
