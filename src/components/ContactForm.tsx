"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

type FormState = typeof INITIAL_FORM_STATE;

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(formState).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
          )
        ),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to send your message. Please try again.");
      }

      setFormState(INITIAL_FORM_STATE);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to send your message at this time.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-[0_25px_60px_rgba(3,7,18,.55)] backdrop-blur">
      <div className="space-y-1">
        <p className="text-sm text-white/70">
          This is the same contact step we use inside the estimator—fill it out here to skip straight to a conversation with the team.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm font-medium">
          <span>First name</span>
          <Input
            name="firstName"
            autoComplete="given-name"
            required
            value={formState.firstName}
            onChange={handleChange}
            placeholder="Pat"
          />
        </label>

        <label className="space-y-1 text-sm font-medium">
          <span>Last name</span>
          <Input
            name="lastName"
            autoComplete="family-name"
            required
            value={formState.lastName}
            onChange={handleChange}
            placeholder="DiFiore"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm font-medium">
          <span>Email</span>
          <Input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={formState.email}
            onChange={handleChange}
            placeholder="you@email.com"
          />
        </label>

        <label className="space-y-1 text-sm font-medium">
          <span>Phone</span>
          <Input
            type="tel"
            name="phone"
            required
            inputMode="tel"
            autoComplete="tel"
            value={formState.phone}
            onChange={handleChange}
            placeholder="610-358-5433"
          />
        </label>
      </div>

      <label className="space-y-1 text-sm font-medium">
        <span>Project address <span className="text-white/50">(optional)</span></span>
        <Input
          name="address"
          autoComplete="street-address"
          value={formState.address}
          onChange={handleChange}
          placeholder="123 Woodworking Way, Chadds Ford"
        />
      </label>

      <label className="space-y-1 text-sm font-medium">
        <span>How can we help?</span>
        <Textarea
          name="message"
          required
          value={formState.message}
          onChange={handleChange}
          placeholder="Tell us about your project, timing, goals, or anything else we should know."
        />
      </label>

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-amber-400 text-zinc-950 hover:bg-amber-300"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>

        <p className="text-xs text-white/50">
          We respond within one business day. Prefer to walk through the calculator?{" "}
          <a href="/project-calculator" className="text-amber-300 underline-offset-4 hover:underline">
            Head to the estimator →
          </a>
        </p>

        <div aria-live="polite" className="text-sm">
          {status === "success" && (
            <p className="rounded-md border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 text-emerald-200">
              Thanks! Your message is in the queue and the team will call or email shortly.
            </p>
          )}
          {status === "error" && errorMessage && (
            <p className="rounded-md border border-red-400/40 bg-red-400/10 px-3 py-2 text-red-200">{errorMessage}</p>
          )}
        </div>
      </div>
    </form>
  );
}
