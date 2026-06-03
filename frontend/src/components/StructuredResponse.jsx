import React from 'react';
import { FileText, Scale, MapPin, ListChecks, Bot, ExternalLink } from 'lucide-react';

const responses = {
  'Property transfer kaise hoti hai?': {
    query: 'Property transfer kaise hoti hai?',
    summary: 'Based on the Transfer of Property Act 1882 and current Pakistani land registration laws, transferring property ownership requires biometric verification at a Sub-Registrar office. The process is standardized across provinces but timeframes may vary.',
    documents: [
      'Original Title Deed (Fard-e-Malkiat)',
      'Valid CNIC of Buyer and Seller',
      'FBR NTN Certificate',
      'Stamp Duty Receipt (from National Bank)',
      'Property Tax Clearance Certificate',
    ],
    lawyerType: 'Property / Civil Lawyer',
    court: 'Civil Court (Sub-Registrar Office)',
    source: 'Transfer of Property Act 1882',
    steps: [
      { title: 'Get Agreement Drafted', detail: 'Draft the Sale Deed on Rs. 1000+ official stamp paper via a licensed scribe.' },
      { title: 'Pay All Dues', detail: 'Pay applicable stamp duties (2-3% of property value), CVT, and any outstanding property taxes.' },
      { title: 'Biometric Verification', detail: 'Appear before the Sub-Registrar with both parties for NADRA biometric identification.' },
      { title: 'Receive Registered Deed', detail: 'Collect the stamped, registered deed — the legal proof of ownership transfer.' },
    ],
  },
  'How to file for divorce?': {
    query: 'How to file for divorce?',
    summary: 'Under the Muslim Family Laws Ordinance 1961, a husband may pronounce Talaq, while a wife may seek Khula through the Family Court. Both processes require formal notice to the Union Council. The court process typically takes 3-6 months depending on mutual consent.',
    documents: [
      'Nikah Nama (Marriage Certificate)',
      'Valid CNIC of Both Spouses',
      'Union Council Notice (Form-VII)',
      'Affidavit of Divorce / Khula Petition',
      'Children\'s Birth Certificates (if applicable)',
    ],
    lawyerType: 'Family Lawyer',
    court: 'Family Court (District Level)',
    source: 'Muslim Family Laws Ordinance 1961',
    steps: [
      { title: 'Send Written Notice', detail: 'Send a formal notice of Talaq to the Chairman of the Union Council and the other spouse. For Khula, file a petition directly in Family Court.' },
      { title: '90-Day Reconciliation Period', detail: 'The Union Council will appoint an Arbitration Council. If reconciliation fails within 90 days, the divorce becomes effective.' },
      { title: 'Court Hearing (Khula)', detail: 'In case of Khula, attend Family Court hearings. The wife may return the Haq Mehr as part of the settlement.' },
      { title: 'Obtain Divorce Certificate', detail: 'Collect the official divorce decree or certificate from the Union Council or Family Court.' },
    ],
  },
  'مزدوری کے حقوق کیا ہیں؟': {
    query: 'مزدوری کے حقوق کیا ہیں؟',
    summary: 'Pakistan ka labour law framework — jismein Factories Act 1934, Minimum Wages Ordinance 1961, aur Industrial Relations Act 2012 shamil hain — workers ko bunyaadi hifazat faraham karta hai. Ye qawaneen kam se kam ujrat, kaam ke auqaat, chutiyon, aur mahfuz kaam ki jagah ka haq dete hain.',
    documents: [
      'Employment Contract / Appointment Letter',
      'Valid CNIC (Worker & Employer)',
      'Payslip Records / Salary Proof',
      'EOBI Registration Card',
      'Social Security Card (PESSI/SESSI)',
    ],
    lawyerType: 'Labour / Employment Lawyer',
    court: 'Labour Court (Provincial)',
    source: 'Factories Act 1934 & Minimum Wages Ordinance 1961',
    steps: [
      { title: 'Document the Violation', detail: 'Collect all proof: salary slips, contract, timesheets, messages, or CCTV footage showing the violation.' },
      { title: 'File Complaint with Labour Inspector', detail: 'Submit a written complaint to the nearest Labour Inspector or Labour Department office in your district.' },
      { title: 'Conciliation Process', detail: 'The Labour Officer will initiate conciliation between you and the employer. Most disputes are resolved at this stage.' },
      { title: 'File Case in Labour Court', detail: 'If conciliation fails, file a formal case in the Labour Court through a labour lawyer for legal redressal.' },
    ],
  },
};

function Section({ icon: Icon, iconColor, title, children }) {
  return (
    <div className="bg-brand-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
      <h3 className="font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100 text-[0.95rem] uppercase tracking-wide">
        <Icon size={17} className={iconColor} />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function StructuredResponse({ queryKey }) {
  const data = queryKey ? responses[queryKey] : responses['Property transfer kaise hoti hai?'];

  if (!data) return null;

  return (
    <div className="animate-slide-up w-full flex flex-col gap-4">

      {/* AI badge */}
      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-dark-muted font-medium">
        <div className="w-7 h-7 rounded-full bg-accent-100 dark:bg-accent-900/50 flex items-center justify-center flex-shrink-0">
          <Bot size={14} className="text-accent-700 dark:text-accent-400" />
        </div>
        <span>AI Legal · based on Pakistani law corpus</span>
      </div>

      {/* Summary card */}
      <div className="bg-brand-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-2xl p-5 shadow-sm">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[0.95rem]">
          {data.summary}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1 mt-3 text-xs text-accent-700 dark:text-accent-400 font-semibold hover:underline"
        >
          View source: {data.source} <ExternalLink size={11} />
        </a>
      </div>

      {/* 2-col grid: Documents + Lawyer & Court */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Documents */}
        <Section icon={FileText} iconColor="text-amber-500" title="Required Documents">
          <ul className="space-y-2">
            {data.documents.map((doc, i) => (
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
          <div className="flex-1 bg-accent-50 dark:bg-accent-950/50 border border-accent-100 dark:border-accent-800/50 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[0.65rem] uppercase font-bold tracking-widest text-accent-600 dark:text-accent-400 mb-1">
                Type of Lawyer
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-tight">
                {data.lawyerType}
              </span>
            </div>
            <div className="bg-accent-100 dark:bg-accent-900/60 p-3 rounded-xl flex-shrink-0">
              <Scale size={22} className="text-accent-700 dark:text-accent-400" />
            </div>
          </div>

          {/* Court */}
          <div className="flex-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-800/40 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div>
              <span className="block text-[0.65rem] uppercase font-bold tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                Appropriate Court
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-100 text-base leading-tight">
                {data.court}
              </span>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/40 p-3 rounded-xl flex-shrink-0">
              <MapPin size={22} className="text-amber-700 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps — vertical timeline */}
      <Section icon={ListChecks} iconColor="text-accent-600 dark:text-accent-400" title="Next Steps">
        <ol className="relative flex flex-col gap-0">
          {data.steps.map((step, i) => (
            <li key={i} className="flex gap-4 relative pb-5 last:pb-0">
              {/* Vertical connector line */}
              {i < data.steps.length - 1 && (
                <div className="absolute left-[13px] top-7 bottom-0 w-px bg-accent-100 dark:bg-accent-800" />
              )}
              {/* Step number bubble */}
              <div className="w-7 h-7 rounded-full bg-accent-100 dark:bg-accent-900/60 text-accent-800 dark:text-accent-300 font-bold flex items-center justify-center flex-shrink-0 text-xs z-10">
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
