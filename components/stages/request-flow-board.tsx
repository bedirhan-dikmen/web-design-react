"use client";

import { CalendarClock, CircleCheck, Mail, MapPin, Phone, Send } from "lucide-react";
import { useStageStep } from "@/components/motion/stage-motion";
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
 */

const STEP_MS = 2600;
const STATES = ["Talep alındı", "Ekibe iletildi", "Görüşme planlandı"] as const;
const PHASES = STATES.length + 1; // one extra beat to hold the finished state

export function RequestFlowBoard() {
  const { ref, step } = useStageStep(STEP_MS);
  const phase = step % PHASES;
  const reached = Math.min(phase, STATES.length - 1);
  const topic = CONTACT_TOPICS[Math.floor(step / PHASES) % CONTACT_TOPICS.length];
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
                  className={`size-5 transition-colors duration-500 ${done ? "text-emerald-500" : "text-board-200"}`}
                  strokeWidth={2.2}
                />
                <span className={`transition-colors duration-500 ${done ? "font-medium text-brand-navy-deep" : "text-board-400"}`}>
                  {label}
                </span>
                {i === reached && (
                  <span key={`n-${step}`} className="ml-auto animate-card-in rounded-full bg-emerald-50 px-2 py-0.5 text-[0.7rem] font-medium text-emerald-700">
                    şimdi
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
            <p className="text-sm font-semibold">Görüşme planlandı</p>
            <p className="mt-0.5 text-white/65">{meetingOnline ? "Online toplantı" : "Yüz yüze, ofisimizde"}</p>
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
