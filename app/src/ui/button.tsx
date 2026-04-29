import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-[13px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-200 disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_4px_14px_-4px_rgba(91,108,255,0.45)]",
        secondary:
          "bg-surface-2 text-text-primary border border-border-strong hover:bg-elevated",
        ghost:
          "text-text-secondary hover:text-text-primary hover:bg-surface-2",
        outline:
          "border border-border-strong text-text-secondary hover:text-text-primary hover:border-accent-500/50 hover:bg-surface-2",
        ai:
          "text-text-primary bg-gradient-to-br from-accent-500/15 to-ai/10 border border-accent-500/30 hover:from-accent-500/25 hover:to-ai/20",
        destructive:
          "bg-risk-critical/15 text-risk-critical border border-risk-critical/30 hover:bg-risk-critical/25",
      },
      size: {
        sm: "h-7 px-2.5 text-[12px]",
        md: "h-8 px-3",
        lg: "h-10 px-4 text-[14px]",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp: any = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
