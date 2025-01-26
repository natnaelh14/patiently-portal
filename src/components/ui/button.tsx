import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/utils/helpers";
import { SpinnerIcon } from "~/components/common/icons";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90",
        primary: "bg-[#336CFB] disabled:bg-[#558EFF] hover:bg-[#1F58E7] py-2 rounded text-white",
        destructive: "bg-red-500 text-neutral-50 hover:bg-red-500/90",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80",
        ghost: "hover:bg-neutral-100 hover:text-neutral-900",
        link: "text-neutral-900 underline-offset-4 hover:underline",
        outline:
          "font-md text-base rounded border-2 hover:bg-zinc-50 border-[#ff7e67] bg-white p-3.5 text-[#ff7e67] inline-flex w-full items-center justify-center gap-2 leading-6 transition",
        "outline-shad-cn":
          "rounded border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isSubmitting?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isSubmitting = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} disabled={isSubmitting}>
          {isSubmitting && (
            <span className="pr-4">
              <SpinnerIcon className="h-6 w-6" />
            </span>
          )}
          {props.children}
        </Comp>
      </>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
