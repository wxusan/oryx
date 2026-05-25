import type { Metadata } from "next";
import Link from "next/link";

const SITE = "https://oryx-flame.vercel.app";

export const metadata: Metadata = {
  title: "Viva Dental — CRM & Patient Management System | ORYX Case Study",
  description:
    "How ORYX built a custom CRM and patient management system for Viva Dental clinic in Tashkent. Appointments, patient records, and clinic operations in one platform.",
  openGraph: {
    title: "Viva Dental CRM — Built by ORYX",
    description: "Custom patient management and clinic operations CRM for Viva Dental. Built by ORYX digital product studio in Tashkent, Uzbekistan.",
    url: `${SITE}/work/viva-dental`,
    images: [{ url: `${SITE}/og?title=Viva+Dental+CRM&sub=Healthcare+CRM+%E2%80%94+Tashkent`, width: 1200, height: 630 }],
  },
  alternates: { canonical: `${SITE}/work/viva-dental` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Viva Dental — CRM & Patient Management System",
  creator: { "@type": "Organization", name: "ORYX", url: SITE },
  description: "Custom CRM and patient management system for Viva Dental clinic in Tashkent. Built by ORYX digital product studio.",
  keywords: "CRM, healthcare, dental clinic, patient management, Tashkent, Uzbekistan",
  dateCreated: "2025",
  confidentialityIndicator: "NDA — URL not public",
};

export default function VivaDentalCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-[#020202] text-[#f6f6f7]">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/[0.07] bg-[#020202]/90 px-[7.6vw] py-4 backdrop-blur-sm">
          <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">← BACK</Link>
          <Link href="/"><img src="/oryx-logo-white.svg" alt="ORYX" className="h-5 w-auto opacity-70" /></Link>
          <a href="/#contact" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#4f4f55] transition-colors hover:text-[#f6f6f7]">CONTACT →</a>
        </div>

        <section className="border-b border-white/[0.07] px-[7.6vw] pb-16 pt-20">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.26em] text-[#4f4f55]">&gt; ORYX / WORK / 03</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-[#f6f6f7] md:text-5xl lg:text-6xl">Viva Dental</h1>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[#8b8b8f]">CRM & Patient Management System</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#b8882a]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b8882a]">IN PROGRESS</span>
              <span className="ml-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#3a3a40]">NDA</span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-[7.6vw] py-20">
          <div className="mb-12 flex flex-wrap gap-2">
            {["CRM", "Healthcare", "Patient Management", "Next.js", "PostgreSQL", "Tashkent"].map((t) => (
              <span key={t} className="border border-white/[0.07] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#4f4f55]">{t}</span>
            ))}
          </div>

          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">01 — OVERVIEW</p>
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#f6f6f7] md:text-3xl">A custom CRM built specifically for dental clinic operations.</h2>
            <p className="text-[15px] leading-[1.8] text-[#9b9ba0]">
              Viva Dental is a dental clinic in Tashkent that was managing patient records, appointments, and billing through a mix of spreadsheets and paper. ORYX built them a custom clinic management system — a web-based CRM tailored exactly to their workflows.
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-[#9b9ba0]">
              The system covers the full patient lifecycle: from initial booking and patient record creation, through treatment history and document storage, to billing and follow-up scheduling. Staff now handle everything from a single interface instead of juggling multiple tools.
            </p>
          </section>

          <div className="mb-16 h-px bg-white/[0.07]" />

          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">02 — WHAT WE BUILT</p>
            <h2 className="mb-6 font-display text-2xl font-semibold text-[#f6f6f7]">Every workflow the clinic needed, in one system.</h2>
            <ul className="space-y-3 text-[15px] leading-[1.8] text-[#9b9ba0]">
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Patient database with full medical and contact history</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Appointment scheduling with calendar view and conflict detection</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Treatment records and document attachments per patient</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Billing and invoice generation</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Staff accounts with role-based access control</li>
              <li className="flex gap-3"><span className="mt-1 shrink-0 font-mono text-[10px] text-[#4f4f55]">→</span> Analytics dashboard: revenue, patient count, appointment volume</li>
            </ul>
          </section>

          <div className="mb-16 h-px bg-white/[0.07]" />

          <section className="mb-16">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.26em] text-[#4f4f55]">03 — TECH STACK</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { label: "Frontend", value: "Next.js, React, TypeScript" },
                { label: "Styling", value: "Tailwind CSS" },
                { label: "Backend", value: "Node.js, PostgreSQL, Prisma" },
                { label: "Auth", value: "Role-based access (admin, doctor, receptionist)" },
                { label: "Deployment", value: "Private server / VPS" },
                { label: "Language", value: "Russian, Uzbek" },
              ].map((item) => (
                <div key={item.label} className="border border-white/[0.07] p-4">
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#4f4f55]">{item.label}</p>
                  <p className="font-display text-[14px] font-medium text-[#f6f6f7]">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t border-white/[0.07] pt-12 text-center">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#4f4f55]">Need a CRM for your business?</p>
            <p className="mb-6 font-display text-xl font-semibold text-[#f6f6f7]">We build custom systems for any industry.</p>
            <a href="/#contact" className="group inline-flex items-center gap-2 border border-[#f6f6f7] bg-[#f6f6f7] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#020202] transition-all duration-300 hover:bg-transparent hover:text-[#f6f6f7]">
              CONTACT ORYX <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
