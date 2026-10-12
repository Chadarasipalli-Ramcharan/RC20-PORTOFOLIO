import { useState, type FormEvent } from "react";
import { ArrowUpRight, Send, Star, Check, AlertCircle, Loader2 } from "lucide-react";
import { personal } from "../data/personal";
import { socials } from "../data/socials";
import { sendMail, isMailerConfigured } from "../lib/mailer";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Basic client-side rate limit to deter spam / duplicate submissions. */
function throttled(key: string, seconds: number): boolean {
  try {
    const last = Number(localStorage.getItem(key) || 0);
    if (Date.now() - last < seconds * 1000) return true;
    localStorage.setItem(key, String(Date.now()));
  } catch {
    /* storage unavailable — allow */
  }
  return false;
}

type Status = "idle" | "sending" | "success" | "error" | "mailto";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", botcheck: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Rating
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [ratingFeedback, setRatingFeedback] = useState("");
  const [ratingEmail, setRatingEmail] = useState("");
  const [ratingStatus, setRatingStatus] = useState<Status>("idle");
  const [ratingError, setRatingError] = useState("");

  const visibleSocials = socials.filter((s) => s.url);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot — bots fill hidden fields; humans never see it.
    if (form.botcheck) return;

    if (!form.name.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please add your name and a message.");
      return;
    }
    if (!isEmail(form.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (throttled("rc25-contact-ts", 30)) {
      setStatus("error");
      setErrorMsg("You just sent a message — please wait a moment before sending another.");
      return;
    }

    // No email service configured → open the visitor's mail client.
    if (!isMailerConfigured()) {
      const subjectLine = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}\n\n— Sent from the RC25 portfolio`
      );
      window.location.href = `mailto:${personal.email}?subject=${subjectLine}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    const result = await sendMail({
      subject: form.subject || `New portfolio message from ${form.name}`,
      name: form.name,
      email: form.email,
      message: form.message,
      from_name: "RC25 Portfolio — Contact Form",
      replyto: form.email,
    });

    if (result.ok) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", botcheck: "" });
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong. Please email me directly.");
    }
  };

  const submitRating = async () => {
    setRatingError("");
    if (ratingEmail && !isEmail(ratingEmail)) {
      setRatingStatus("error");
      setRatingError("That email doesn't look right — or leave it blank.");
      return;
    }
    if (throttled("rc25-rating-ts", 60)) {
      setRatingStatus("error");
      setRatingError("Thanks! You've already submitted a rating recently.");
      return;
    }

    if (!isMailerConfigured()) {
      const subjectLine = encodeURIComponent(`Portfolio Rating: ${rating}/5`);
      const body = encodeURIComponent(
        `Rating: ${rating} / 5\nFeedback: ${ratingFeedback || "(none)"}\nVisitor email: ${ratingEmail || "(not provided)"}`
      );
      window.location.href = `mailto:${personal.email}?subject=${subjectLine}&body=${body}`;
      setRatingStatus("mailto");
      return;
    }

    setRatingStatus("sending");
    const result = await sendMail({
      subject: `Portfolio Rating: ${rating}/5 ★`,
      rating: `${rating} / 5`,
      feedback: ratingFeedback || "(none)",
      visitor_email: ratingEmail || "(not provided)",
      from_name: "RC25 Portfolio — Rating",
      ...(ratingEmail ? { replyto: ratingEmail } : {}),
    });

    if (result.ok) {
      setRatingStatus("success");
      setRatingFeedback("");
      setRatingEmail("");
    } else {
      setRatingStatus("error");
      setRatingError(result.error || "Couldn't submit the rating. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-pad border-t border-line">
      <div className="container-x">
        <SectionHeading
          index="09"
          label="Contact // Let's Connect"
          title="Let's build something meaningful."
          description="Open for AI & ML internships, engineering collaborations, and forward-looking product discussions."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Direct channels & personal links */}
          <div>
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-semibold">
                Direct Communication
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="mt-3 block font-display text-2xl font-semibold break-all text-ink transition-colors hover:text-accent sm:text-3xl"
              >
                {personal.email}
              </a>
              <p className="mt-2 text-xs sm:text-sm text-muted">
                Based in {personal.location} · Available across global time zones.
              </p>
            </Reveal>

            {/* Social Channels */}
            <Reveal delay={0.1}>
              <div className="mt-8">
                <span className="font-mono text-[10px] tracking-[0.25em] text-faint uppercase font-semibold">
                  Verified Profiles
                </span>
                <div className="mt-2">
                  {visibleSocials.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between border-b border-line py-3.5 transition-colors hover:border-accent"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-base font-semibold text-ink transition-colors group-hover:text-accent">
                          {s.label}
                        </span>
                        <span className="font-mono text-[10px] text-faint">{s.handle}</span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Portfolio Rating — functional, delivered by email */}
            <Reveal delay={0.16}>
              <div className="mt-8 rounded-xl border border-line bg-elev/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase font-semibold">
                    Rate Your Experience
                  </span>
                  <span className="font-mono text-[10px] font-semibold text-accent">
                    {hoverRating ?? rating} / 5
                  </span>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const active = (hoverRating ?? rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        aria-label={`Rate ${star} stars`}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          size={20}
                          className={`transition-colors ${
                            active ? "fill-accent text-accent" : "text-muted/40 hover:text-accent/60"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {ratingStatus === "success" ? (
                  <p className="mt-3 flex items-center gap-2 text-xs text-accent">
                    <Check size={13} /> Thank you — your rating was sent.
                  </p>
                ) : (
                  <div className="mt-3 space-y-2.5">
                    <input
                      type="text"
                      value={ratingFeedback}
                      onChange={(e) => setRatingFeedback(e.target.value)}
                      placeholder="Optional feedback…"
                      className="w-full border-b border-line bg-transparent py-2 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
                    />
                    <input
                      type="email"
                      value={ratingEmail}
                      onChange={(e) => setRatingEmail(e.target.value)}
                      placeholder="Your email (optional)"
                      className="w-full border-b border-line bg-transparent py-2 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-accent"
                    />
                    {ratingStatus === "error" && (
                      <p className="flex items-center gap-1.5 text-[11px] text-red-400">
                        <AlertCircle size={12} /> {ratingError}
                      </p>
                    )}
                    {ratingStatus === "mailto" && (
                      <p className="text-[11px] text-muted">Opening your email app to send the rating…</p>
                    )}
                    <button
                      type="button"
                      onClick={submitRating}
                      disabled={ratingStatus === "sending"}
                      className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-4 py-2 text-[11px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent disabled:opacity-60"
                    >
                      {ratingStatus === "sending" ? (
                        <>
                          <Loader2 size={12} className="animate-spin" /> Sending…
                        </>
                      ) : (
                        <>Submit rating</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Contact form */}
          <Reveal delay={0.12}>
            <form
              onSubmit={submit}
              className="rounded-2xl border border-line bg-elev p-6 sm:p-8 shadow-sm"
              aria-label="Contact form"
            >
              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                value={form.botcheck}
                onChange={(e) => setForm({ ...form, botcheck: e.target.value })}
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="font-mono text-[10px] tracking-[0.25em] text-faint uppercase font-semibold">
                    Your Name
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-faint focus:border-accent"
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className="font-mono text-[10px] tracking-[0.25em] text-faint uppercase font-semibold">
                    Your Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-faint focus:border-accent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="cf-subject" className="font-mono text-[10px] tracking-[0.25em] text-faint uppercase font-semibold">
                  Subject / Topic
                </label>
                <input
                  id="cf-subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Machine Learning Internship / Project Inquiry"
                  className="mt-2 w-full border-b border-line bg-transparent py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-faint focus:border-accent"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="cf-message" className="font-mono text-[10px] tracking-[0.25em] text-faint uppercase font-semibold">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project, team, or ideas..."
                  className="mt-2 w-full resize-none border-b border-line bg-transparent py-2.5 text-sm text-ink transition-colors outline-none placeholder:text-faint focus:border-accent"
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <p className="mt-5 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent-soft px-3 py-2.5 text-xs text-accent">
                  <Check size={14} /> Message sent — thank you! I'll reply to your email soon.
                </p>
              )}
              {status === "mailto" && (
                <p className="mt-5 flex items-center gap-2 rounded-lg border border-line px-3 py-2.5 text-xs text-muted">
                  <Check size={14} /> Your email app is opening with the message ready to send.
                </p>
              )}
              {status === "error" && (
                <p className="mt-5 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-3 py-2.5 text-xs text-red-400">
                  <AlertCircle size={14} /> {errorMsg}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-semibold tracking-wide text-accent-ink transition-colors hover:bg-accent2 disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <span className="font-mono text-[9px] tracking-[0.2em] text-faint uppercase">
                  {isMailerConfigured() ? "Delivered to my inbox" : "Opens your email app"}
                </span>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
