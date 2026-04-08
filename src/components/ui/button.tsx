import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[0.9375rem] font-normal tracking-tight ring-offset-background transition-[background,box-shadow,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-apple-sm hover:brightness-105 active:brightness-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-black/[0.08] bg-transparent text-foreground hover:bg-black/[0.04] active:bg-[#ededf2]",
        secondary: "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 shadow-apple-sm",
        ghost: "hover:bg-black/[0.06] hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glow: "bg-primary text-primary-foreground shadow-apple-sm hover:brightness-105",
        glass: "border border-black/[0.06] bg-white/70 text-foreground shadow-apple-sm backdrop-blur-xl backdrop-saturate-[180] hover:bg-white/85",
      },
      size: {
        default: "h-11 px-[15px]",
        sm: "h-9 rounded-lg px-3.5 text-[0.8125rem]",
        lg: "h-11 rounded-lg px-8 text-[1.0625rem]",
        xl: "h-12 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
