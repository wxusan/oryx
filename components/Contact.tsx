"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const SERVICES = [
  "Website / Landing Page",
  "Mobile App",
  "CRM / ERP System",
  "AI Automation",
  "Other",
];

type Status = "idle" | "sending" | "done" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.032)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "4px",
  padding: "14px 16px",
  color: "#f6f6f7",
  fontFamily: "var(--font-jetbrains),monospace",
  fontSize: "13px",
  letterSpacing: "0.01em",
  outline: "none",
  transition: "border-color 0.2s ease",
};

export function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [name,     setName]     = useState("");
  const [phone,    setPhone]    = useState("");
  const [telegram, setTelegram] = useState("");
  const [service,  setService]  = useState("");
  const [message,  setMessage]  = useState("");
  const [status,   setStatus]   = useState<Status>("idle");
  const [focused,  setFocused]  = useState<string | null>(null);

  const focusBorder = (field: string) =>
    focused === field ? "1px solid rgba(255,255,255,0.35)" : inputStyle.border;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !service) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, telegram, service, message }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative bg-[#020202] px-[7.6vw] py-28 lg:py-36"
      aria-label="Contact ORYX"
    >
      {/* Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        backgroundImage: ["linear-gradient(to right,rgba(255,255,255,0.022) 1px,transparent 1px)","linear-gradient(to bottom,rgba(255,255,255,0.018) 1px,transparent 1px)"].join(","),
        backgroundSize: "80px 80px",
      }} />

      {/* Grain */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light" style={{ opacity: 0.022 }}>
        <filter id="contact-grain"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
        <rect width="100%" height="100%" filter="url(#contact-grain)"/>
      </svg>

      <div className="relative z-10 flex flex-col gap-16 lg:flex-row lg:gap-24">

        {/* ── Left — heading ───────────────────────────────────────────── */}
        <div className="w-full lg:w-[38%]">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease }}
            style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace", marginBottom: "24px" }}
          >
            &gt; CONTACT
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-display font-semibold text-oryx-white"
            style={{ fontSize: "clamp(32px,3.8vw,58px)", letterSpacing: "-0.025em", lineHeight: 1.06, marginBottom: "20px" }}
          >
            Let's build<br />something.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ fontSize: "13px", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1.75, maxWidth: "300px" }}
          >
            Fill in the form and I'll get back to you within 24 hours.
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, originX: "0%" }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginTop: "36px", marginBottom: "36px" }}
          />

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.34, ease }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-4">
              <span style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace", minWidth: "72px" }}>
                TELEGRAM
              </span>
              <a
                href="https://t.me/wxusan"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "13px", color: "#9b9ba0", fontFamily: "var(--font-jetbrains),monospace", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f6f6f7")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9b9ba0")}
              >
                @wxusan ↗
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace", minWidth: "72px" }}>
                PHONE
              </span>
              <a
                href="tel:+998770411222"
                style={{ fontSize: "13px", color: "#9b9ba0", fontFamily: "var(--font-jetbrains),monospace", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f6f6f7")}
                onMouseLeave={e => (e.currentTarget.style.color = "#9b9ba0")}
              >
                +998 77 041 12 22
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Right — form ─────────────────────────────────────────────── */}
        <motion.div
          className="w-full lg:w-[62%]"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.18, ease }}
        >
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="flex flex-col items-start gap-4"
                style={{ paddingTop: "40px" }}
              >
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  border: "1px solid rgba(74,158,92,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: "#4a9e5c", fontSize: "18px" }}>✓</span>
                </div>
                <h3 className="font-display font-semibold text-oryx-white" style={{ fontSize: "clamp(22px,2.2vw,32px)", letterSpacing: "-0.02em" }}>
                  Message sent.
                </h3>
                <p style={{ fontSize: "13px", color: "#8b8b8f", fontFamily: "var(--font-jetbrains),monospace", lineHeight: 1.7 }}>
                  I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                exit={{ opacity: 0 }}
              >
                {/* Row 1 — Name + Phone */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                      NAME *
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      required
                      style={{ ...inputStyle, border: focusBorder("name") }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                      PHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 XX XXX XX XX"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      required
                      style={{ ...inputStyle, border: focusBorder("phone") }}
                    />
                  </div>
                </div>

                {/* Row 2 — Telegram + Service */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                      TELEGRAM <span style={{ color: "#2e2e38" }}>(OPTIONAL)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="@username"
                      value={telegram}
                      onChange={e => setTelegram(e.target.value)}
                      onFocus={() => setFocused("telegram")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle, border: focusBorder("telegram") }}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                      WHAT DO YOU NEED *
                    </label>
                    <select
                      value={service}
                      onChange={e => setService(e.target.value)}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused(null)}
                      required
                      style={{ ...inputStyle, border: focusBorder("service"), appearance: "none", cursor: "pointer" }}
                    >
                      <option value="" disabled style={{ background: "#020202" }}>Select a service</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s} style={{ background: "#020202" }}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label style={{ fontSize: "9px", letterSpacing: "0.24em", color: "#4f4f55", fontFamily: "var(--font-jetbrains),monospace" }}>
                    MESSAGE <span style={{ color: "#2e2e38" }}>(OPTIONAL)</span>
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={4}
                    style={{ ...inputStyle, border: focusBorder("message"), resize: "vertical" }}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-3 border border-oryx-white bg-oryx-white px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-oryx-black transition-all duration-300 hover:bg-transparent hover:text-oryx-white disabled:opacity-50"
                  >
                    {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
                    {status !== "sending" && (
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    )}
                  </button>
                  {status === "error" && (
                    <span style={{ fontSize: "11px", color: "#9e4a4a", fontFamily: "var(--font-jetbrains),monospace", letterSpacing: "0.1em" }}>
                      Something went wrong. Try again.
                    </span>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
