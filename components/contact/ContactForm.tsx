"use client";

// Client because it holds form state, validates before the action runs, and
// reads the treatment prefill from the URL.
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  submitContactAction,
  type ContactResultType,
} from "@/actions/contactAction";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/siteConfig";
import type { ContactPrefillType } from "@/lib/contactPrefills";
import {
  makeContactSchema,
  type ContactValuesType,
} from "@/lib/contactValidation";
import { cn } from "@/lib/cn";

const FIELD =
  "h-auto w-full rounded-sm border-border bg-background px-4 py-3 text-[15px] shadow-none focus-visible:border-copper focus-visible:ring-0 aria-invalid:border-destructive";

const LABEL =
  "mb-2 block text-xs tracking-[0.1em] text-muted-foreground uppercase";

/**
 * All three come from the server. Resolving them here meant importing
 * `getService` and `CONTACT_TOPICS` into a client component, which pulled all
 * 41 services - names, prices, durations, descriptions - into the browser to
 * read one name and one null check.
 */
type Props = {
  topics: readonly string[];
  generalTopic: string;
  prefills: Record<string, ContactPrefillType>;
};

export function ContactForm({ topics, generalTopic, prefills }: Props) {
  const id = useId();
  const doneRef = useRef<HTMLHeadingElement>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);
  const [result, setResult] = useState<ContactResultType | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactValuesType>({
    resolver: zodResolver(useMemo(() => makeContactSchema(topics), [topics])),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      topic: generalTopic,
      message: "",
    },
  });

  // The page is static, so the server never sees the query. Reading it from
  // the browser after mount keeps the markup identical through hydration and
  // avoids a Suspense boundary, which the dev server streams unreliably.
  useEffect(() => {
    const treatment = new URLSearchParams(window.location.search).get(
      "treatment",
    );
    if (!treatment) return;
    const values = prefills[treatment];
    if (!values) return;
    setValue("topic", values.topic);
    setValue("message", values.message);
  }, [setValue, prefills]);

  // Focus lands on the confirmation once it exists, so the change is announced.
  //
  // AND THE PAGE SCROLLS TO IT, which is the part that was missing. On a phone
  // the Send button sits near the bottom of a tall card, so both answers -
  // the confirmation that replaces the form, and the error that appears above
  // the button - could land outside the viewport. You tapped Send, nothing
  // appeared to move, and the only way to learn what happened was to scroll
  // and go looking. `focus()` alone did not reliably bring it into view.
  useEffect(() => {
    if (!result) return;
    const target = result.success ? doneRef.current : alertRef.current;
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    if (result.success) doneRef.current?.focus();
  }, [result]);

  async function onSubmit(values: ContactValuesType) {
    setResult(null);
    setResult(await submitContactAction(values));
  }

  // The confirmation takes the heading's place rather than appearing under it,
  // so the card reads as one state at a time.
  if (result?.success) {
    return (
      <div role="status">
        <h2 ref={doneRef} tabIndex={-1} className="text-[34px] outline-none">
          Sent. We reply within a day.
        </h2>
        <p className="mt-3 text-[15px] text-muted-foreground">
          If it is quicker, a text to {siteConfig.phone.display} reaches the
          same person.
        </p>
      </div>
    );
  }

  const describe = (field: keyof ContactValuesType) =>
    errors[field] ? `${id}-${field}-error` : undefined;

  return (
    <>
    <h2 className="text-[34px]">Send a message</h2>
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <Label htmlFor={`${id}-name`} className={LABEL}>
            Name
          </Label>
          <Input
            id={`${id}-name`}
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className={FIELD}
            {...register("name")}
          />
          <FieldError id={`${id}-name-error`} message={errors.name?.message} />
        </div>
        {/* Two fields, either one enough. The schema requires one of them and
            pins the "we need one" message under Email, so a visitor who fills
            neither is told once rather than twice. */}
        <div>
          <Label htmlFor={`${id}-email`} className={LABEL}>
            Email
          </Label>
          <Input
            id={`${id}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            className={FIELD}
            {...register("email")}
          />
          <FieldError id={`${id}-email-error`} message={errors.email?.message} />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor={`${id}-phone`} className={LABEL}>
          Phone
        </Label>
        <Input
          id={`${id}-phone`}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(587) 000-0000"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={describe("phone")}
          className={FIELD}
          {...register("phone")}
        />
        <FieldError id={`${id}-phone-error`} message={errors.phone?.message} />
        <p className="mt-1.5 text-[13px] text-muted-foreground">
          Either one is enough. Both is quicker.
        </p>
      </div>
      <div className="mt-4">
        <Label htmlFor={`${id}-topic`} className={LABEL}>
          What&apos;s it about
        </Label>
        <select
          id={`${id}-topic`}
          aria-invalid={errors.topic ? true : undefined}
          aria-describedby={describe("topic")}
          className={cn("border", FIELD)}
          {...register("topic")}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <FieldError id={`${id}-topic-error`} message={errors.topic?.message} />
      </div>
      <div className="mt-4">
        <Label htmlFor={`${id}-message`} className={LABEL}>
          Message
        </Label>
        <Textarea
          id={`${id}-message`}
          rows={5}
          placeholder="Tell us what you're hoping to change, and anything about your skin we should know."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describe("message")}
          className={cn(FIELD, "min-h-[110px] resize-y")}
          {...register("message")}
        />
        <FieldError
          id={`${id}-message-error`}
          message={errors.message?.message}
        />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          id={`${id}-company`}
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>
      {result && !result.success && (
        <p
          ref={alertRef}
          role="alert"
          className="mt-5 rounded-sm border border-destructive/40 bg-background px-4 py-3 text-[14px]"
        >
          {result.error}{" "}
          <a
            href={siteConfig.phone.sms}
            className="underline underline-offset-2"
          >
            Text {siteConfig.phone.display}
          </a>{" "}
          or{" "}
          <a
            href={siteConfig.phone.tel}
            className="underline underline-offset-2"
          >
            call
          </a>{" "}
          instead.
        </p>
      )}
      {/* Send alone. The icons that were here moved into the hero beside
          this card, where they are the page's one set; a second copy inside
          the form put the same three actions twice inside one screen. The
          line that was here before them, "We reply within a day. Nothing is
          stored beyond the message itself.", went with the same reasoning:
          the reply promise stands once, under the number. */}
      <div className="mt-7 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonVariants()}
        >
          {isSubmitting ? "Sending" : "Send"}
        </button>
      </div>
    </form>
    </>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] text-destructive">
      {message}
    </p>
  );
}
