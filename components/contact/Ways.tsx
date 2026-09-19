import { Mail, MessageSquare, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/data/siteConfig";
import { smsLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

type Way = {
  href: string;
  icon: ReactNode;
  title: string;
  body: string;
  value: string;
  action: string;
  primary?: boolean;
};

export function Ways() {
  const { phone, email } = siteConfig;
  const ways: Way[] = [
    {
      href: smsLink("Hi! I'd like to ask about "),
      icon: <MessageSquare className="size-4" />,
      title: "Text",
      body: "Goes straight to her phone and gets answered between clients, usually the same day. Best for questions, prices, and whether something is right for you.",
      value: phone.display,
      action: "Send a text",
      primary: true,
    },
    {
      href: phone.tel,
      icon: <Phone className="size-4" />,
      title: "Call",
      body: "Works if she's between appointments. Check the hours below first; they change every day.",
      value: phone.display,
      action: "Call now",
    },
    {
      href: `mailto:${email}`,
      icon: <Mail className="size-4" />,
      title: "Email",
      body: "Fine for anything that isn't urgent. Slower than a text, and easier to lose in a busy week.",
      value: email,
      action: "Send an email",
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr_1fr]">
      {ways.map((way) => (
        <a
          key={way.title}
          href={way.href}
          className={cn(
            "flex flex-col rounded-lg border p-7 transition-[border-color,transform] duration-200 hover:-translate-y-0.5",
            way.primary
              ? "border-copper bg-accent"
              : "border-border bg-card hover:border-copper-soft",
          )}
        >
          <span className="mb-[18px] grid size-10 place-items-center rounded-full border border-copper text-copper">
            {way.icon}
          </span>
          <h3 className="text-[26px]">{way.title}</h3>
          <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted-foreground">
            {way.body}
          </p>
          <span
            className={cn(
              "mt-4 block font-serif",
              way.title === "Email" ? "text-[15px] break-all" : "text-[22px]",
            )}
          >
            {way.value}
          </span>
          <span
            className={cn(
              "mt-[18px] self-start",
              buttonVariants({ variant: way.primary ? "default" : "outline" }),
            )}
          >
            {way.action}
          </span>
          {way.primary && (
            <small className="mt-3 block text-xs tracking-[0.06em] text-accent-foreground uppercase">
              Recommended
            </small>
          )}
        </a>
      ))}
    </div>
  );
}
