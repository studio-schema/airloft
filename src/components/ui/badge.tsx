import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "purple"
    | "pink"
    | "cyan"
    | "amber"
    | "rose"
    | "indigo"
    | "teal"
    | "violet"
    | "slate";
  size?: "sm" | "md";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-white/10 text-foreground-secondary",
      purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      pink: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
      indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      teal: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
      slate: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    };

    const sizes = {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-1",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full border",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
