"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff, Info, Loader2, LogIn } from "lucide-react";
import { signInDealer, validateDealerLogin, type DealerLoginErrors } from "@/lib/dealer-auth";
import { DEALER_COPY } from "@/lib/content/dealer";

/**
 * Dealer login card. Validation runs on submit and then live per field once
 * a field has been touched. On an invalid submit focus moves to the first
 * invalid field; each error is tied to its input via aria-describedby.
 * The submit result is announced through a role="alert" region.
 */
export function DealerLoginForm() {
  const uid = useId();
  const ids = {
    identifier: `${uid}-id`,
    identifierError: `${uid}-id-err`,
    password: `${uid}-pw`,
    passwordError: `${uid}-pw-err`,
    remember: `${uid}-rem`,
  };
  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ identifier: false, password: false });
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<"not-available" | "invalid-credentials" | "network" | null>(null);

  const errors: DealerLoginErrors = validateDealerLogin({ identifier, password });
  const show = (field: "identifier" | "password") => (submitted || touched[field]) && errors[field];

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setResult(null);
    if (errors.identifier) return identifierRef.current?.focus();
    if (errors.password) return passwordRef.current?.focus();

    setPending(true);
    try {
      const res = await signInDealer({ identifier: identifier.trim(), password, remember });
      // A successful response is impossible with the stub; when the backend
      // exists, navigate to res.redirectTo here.
      if (!res.ok) setResult(res.reason);
    } catch {
      setResult("network");
    } finally {
      setPending(false);
      // Never keep the password around after an attempt.
      setPassword("");
      setTouched((t) => ({ ...t, password: false }));
      setSubmitted(false);
    }
  }

  const inputBase =
    "block w-full rounded-[var(--radius-sm)] border bg-surface px-3.5 py-3 text-ink placeholder:text-ink-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1";
  const inputState = (bad: boolean) =>
    bad ? "border-danger focus-visible:ring-danger" : "border-line-2 hover:border-ink-3 focus-visible:ring-red";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby={`${uid}-hint`} className="space-y-5">
      <p id={`${uid}-hint`} className="sr-only">
        Tüm alanlar zorunludur.
      </p>

      {result && (
        <div
          role="alert"
          className={`flex gap-3 rounded-[var(--radius-sm)] border p-3.5 text-sm ${
            result === "not-available" ? "border-line-2 bg-surface-2 text-ink" : "border-danger/40 bg-red-soft text-ink"
          }`}
        >
          {result === "not-available" ? (
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-2" />
          ) : (
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-danger" />
          )}
          <p>{DEALER_COPY.results[result]}</p>
        </div>
      )}

      <div>
        <label htmlFor={ids.identifier} className="mb-1.5 block text-sm font-semibold text-ink">
          {DEALER_COPY.identifierLabel}
        </label>
        <input
          ref={identifierRef}
          id={ids.identifier}
          name="identifier"
          type="text"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, identifier: true }))}
          aria-invalid={show("identifier") ? true : undefined}
          aria-describedby={show("identifier") ? ids.identifierError : undefined}
          placeholder={DEALER_COPY.identifierPlaceholder}
          className={`${inputBase} ${inputState(Boolean(show("identifier")))}`}
        />
        {show("identifier") && (
          <p id={ids.identifierError} className="mt-1.5 flex gap-1.5 text-sm text-danger">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {errors.identifier}
          </p>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <label htmlFor={ids.password} className="block text-sm font-semibold text-ink">
            {DEALER_COPY.passwordLabel}
          </label>
          <Link
            href={DEALER_COPY.forgotHref}
            className="text-sm font-semibold text-red underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            {DEALER_COPY.forgot}
          </Link>
        </div>
        <div className="relative">
          <input
            ref={passwordRef}
            id={ids.password}
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            aria-invalid={show("password") ? true : undefined}
            aria-describedby={show("password") ? ids.passwordError : undefined}
            className={`${inputBase} pr-12 ${inputState(Boolean(show("password")))}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
            aria-pressed={showPassword}
            aria-controls={ids.password}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-[var(--radius-sm)] text-ink-2 hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red"
          >
            {showPassword ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
          </button>
        </div>
        {show("password") && (
          <p id={ids.passwordError} className="mt-1.5 flex gap-1.5 text-sm text-danger">
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            {errors.password}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <input
          id={ids.remember}
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="size-4.5 rounded border-line-2 accent-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        />
        <label htmlFor={ids.remember} className="text-sm text-ink-2">
          {DEALER_COPY.remember}
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-red px-5 py-3.5 font-semibold text-white shadow-lg shadow-red/20 transition-colors hover:bg-red-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red disabled:cursor-wait disabled:opacity-80"
      >
        {pending ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            {DEALER_COPY.pending}
          </>
        ) : (
          <>
            <LogIn aria-hidden="true" className="size-4" />
            {DEALER_COPY.submit}
          </>
        )}
      </button>
    </form>
  );
}
