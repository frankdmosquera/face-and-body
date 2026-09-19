"use client";

// Client because it holds form state, validates before the action runs, and
// reads the treatment prefill from the URL.
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { submitContact, type ContactResult } from "@/actions/contact";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/siteConfig";
import { CONTACT_TOPICS, GENERAL_TOPIC, pricingTopic } from "@/lib/contact";
import { contactSchema, type ContactValues } from "@/lib/contactSchema";
import { getService } from "@/lib/services";
import { cn } from "@/lib/utils";

const FIELD =
  "h-auto w-full rounded-sm border-border bg-background px-4 py-3 text-[15px] shadow-none focus-visible:border-copper focus-visible:ring-0 aria-invalid:border-destructive";

const LABEL =
  "mb-2 block text-xs tracking-[0.1em] text-muted-foreground uppercase";

function prefill(slug: string | null): Pick<ContactValues, "topic" | "message"> {
  const service = slug ? getService(slug) : undefined;
  if (!service) return { topic: GENERAL_TOPIC, message: "" };
  return {
    topic: service.price === null ? pricingTopic(service) : GENERAL_TOPIC,
    message: `Hi, I have a question about ${service.name}. `,
  };
}

export function ContactForm() {
  const id = useId();
  const doneRef = useRef<HTMLHeadingElement>(null);
  const [result, setResult] = useState<ContactResult | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      contact: "",
      company: "",
      topic: GENERAL_TOPIC,
      message: "",
    },
  });

  // The page is static, so the server never sees the query. Reading it from
  // the browser after mount keeps the markup identical through hydration and
  // avoids a Suspense boundary, which the dev server streams unreliably.
  useEffect(() => {
    const treatment = new URLSearchParams(window.location.search).get("treatment");
    if (!treatment) return;
    const values = prefill(treatment);
    setValue("topic", values.topic);
    setValue("message", values.message);
  }, [setValue]);

  // Focus lands on the confirmation once it exists, so the change is announced.
  useEffect(() => {
    if (result?.success) doneRef.current?.focus();
  }, [result]);

  async function onSubmit(values: ContactValues) {
    setResult(null);
    setResult(await submitContact(values));
  }

  if (result?.success) {
    return (
      <div role="status" className="mt-6">
        <h3 ref={doneRef} tabIndex={-1} className="text-[26px] outline-none">
          Sent. We reply within a day.
        </h3>
        <p className="mt-2 text-[14px] text-muted-foreground">
          If it is quicker, a text to {siteConfig.phone.display} reaches the
          same person.
        </p>
      </div>
    );
  }

  const describe = (field: keyof ContactValues) =>
    errors[field] ? `${id}-${field}-error` : undefined;

  return (
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
        <div>
          <Label htmlFor={`${id}-contact`} className={LABEL}>
            Phone or email
          </Label>
          <Input
            id={`${id}-contact`}
            autoComplete="tel email"
            placeholder="How to reach you"
            aria-invalid={errors.contact ? true : undefined}
            aria-describedby={describe("contact")}
            className={FIELD}
            {...register("contact")}
          />
          <FieldError
            id={`${id}-contact-error`}
            message={errors.contact?.message}
          />
        </div>
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
          {CONTACT_TOPICS.map((topic) => (
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
          role="alert"
          className="mt-5 rounded-sm border border-destructive/40 bg-background px-4 py-3 text-[14px]"
        >
          {result.error}{" "}
          <a href={siteConfig.phone.sms} className="underline underline-offset-2">
            Text {siteConfig.phone.display}
          </a>{" "}
          or{" "}
          <a href={siteConfig.phone.tel} className="underline underline-offset-2">
            call
          </a>{" "}
          instead.
        </p>
      )}
      <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <small className="text-[13px] text-muted-foreground">
          We reply within a day. Nothing is stored beyond the message itself.
        </small>
        <button
          type="submit"
          disabled={isSubmitting}
          className={buttonVariants({ className: "self-start lg:self-auto" })}
        >
          {isSubmitting ? "Sending" : "Send"}
        </button>
      </div>
    </form>
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
