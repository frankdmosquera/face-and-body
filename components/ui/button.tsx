import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border text-[13px] font-medium tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-copper-hover",
        outline:
          "border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background in-data-[tone=dark]:border-on-dark in-data-[tone=dark]:text-on-dark in-data-[tone=dark]:hover:bg-on-dark in-data-[tone=dark]:hover:text-dark",
        link: "rounded-none border-0 border-b border-copper pb-0.5 text-foreground hover:text-accent-foreground in-data-[tone=dark]:text-on-dark",
      },
      size: {
        default: "px-5 py-3 lg:px-[26px] lg:py-3.5",
        sm: "px-4 py-2.5 text-xs",
        icon: "size-10 p-0",
      },
    },
    compoundVariants: [
      { variant: "link", size: "default", className: "p-0 lg:p-0 lg:pb-0.5" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
