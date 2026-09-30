"use client";

import { CalendarClock, CircleCheck, Mail, MapPin, Phone, Send } from "lucide-react";
import { useLocale } from "@/components/i18n/locale-provider";
import { useStageStep } from "@/components/motion/stage-motion";
import type { L } from "@/lib/i18n";
import { CONTACT_TOPICS } from "@/lib/content/company";
import { SITE } from "@/lib/site";

/**
 * /iletisim stage — what happens to a message.
 *
 * A request card (topic from the contact form's own list) moves through
 * "Talep alındı → Ekibe iletildi → Görüşme planlandı", the process the FAQ
 * describes; once planned, a meeting card appears (face-to-face or online, as
 * the contact page offers). The channel strip underneath is the real, verified
 * contact data from lib/site.ts. No response time is promised.
 *
 * Paced slowly (4.2s a step, owner request 2026-09) so each state can be read.
 */

const STEP_MS = 4200;
const T: L<{ states: [string, string, string]; now: string; planned: string; online: string; office: string }> = {
  tr: {
    states: ["Talep alındı", "Ekibe iletildi", "Görüşme planlandı"],
    now: "şimdi",
    planned: "Görüşme planlandı",
    online: "Online toplantı",
    office: "Yüz yüze, ofisimizde",
  },
  en: {
    states: ["Request received", "Passed to the team", "Meeting scheduled"],
    now: "now",
    planned: "Meeting scheduled",
    online: "Online meeting",
    office: "In person, at our office",
  },
};
const PHASES = 4; // three states plus one beat to hold the finished state

export function RequestFlowBoard() {
  const locale = useLocale();
  const t = T[locale];
  const STATES = t.states;
  const topics = CONTACT_TOPICS[locale];
  const { ref, step } = useStageStep(STEP_MS);
  const phase = step % PHASES;
  const reached = Math.min(phase, STATES.length - 1);
  const topic = topics[Math.floor(step / PHASES) % topics.length];
  const TopicIcon = topic.icon;
  const meetingOnline = Math.floor(step / PHASES) % 2 === 1;

  return (
    <div ref={ref} data-board="request" aria-hidden="true" className="relative mx-auto w-full max-w-[600px] select-none pb-6 pt-4">
      <div
        key={`req-${Math.floor(step / PHASES)}`}
        className="animate-card-in rounded-2xl bg-white p-5 text-brand-navy-deep shadow-[0_40px_90px_-30px_rgba(0,8,30,0.85)] sm:mr-16"
      >
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-bold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
              <TopicIcon className="size-4" />
            </span>
            {topic.title}
          </p>
          <Send className="size-4 text-board-400" />
        </div>
        <p className="mt-3 rounded-xl bg-board-50 p-3 text-sm leading-relaxed text-board-600">{topic.text}</p>

        <ol className="mt-4 space-y-2">
          {STATES.map((label, i) => {
            const done = i <= reached;
            return (
              <li key={label} className="flex items-center gap-2.5 text-sm">
                <CircleCheck
                  className={`size-5 transition-colors duration-500 ${done ? "text-brand-red" : "text-board-200"}`}
                  strokeWidth={2.2}
                />
                <span className={`transition-colors duration-500 ${done ? "font-medium text-brand-navy-deep" : "text-board-400"}`}>
                  {label}
                </span>
                {i === reached && (
                  <span key={`n-${step}`} className="ml-auto animate-card-in rounded-full bg-board-100 px-2 py-0.5 text-[0.7rem] font-medium text-board-800">
                    {t.now}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      {reached === STATES.length - 1 && (
        <div
          key={`meet-${step}`}
          className="absolute -top-2 right-0 flex w-[14rem] animate-card-in items-center gap-3 rounded-2xl bg-brand-navy-deep p-4 text-white shadow-2xl shadow-black/40 ring-1 ring-white/15 sm:-right-4"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-red">
            <CalendarClock className="size-5" />
          </span>
          <div className="text-xs">
            <p className="text-sm font-semibold">{t.planned}</p>
            <p className="mt-0.5 text-white/65">{meetingOnline ? t.online : t.office}</p>
          </div>
        </div>
      )}

      <ul className="mt-5 flex flex-wrap gap-2 text-xs text-white/80">
        <li className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5">
          <Phone className="size-3.5" /> {SITE.contact.phoneDisplay}
        </li>
        <li className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5">
          <Mail className="size-3.5" /> {SITE.contact.email}
        </li>
        <li className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5">
          <MapPin className="size-3.5" /> Bulancak / Giresun
        </li>
      </ul>
    </div>
  );
}
