import * as React from "react"

const variantClasses = {
    default: "border-transparent bg-primary/10 text-primary",
    secondary: "border-transparent bg-secondary/10 text-secondary",
    accent: "border-transparent bg-accent/10 text-accent",
    outline: "border-white/20 text-gray-300 bg-white/5",
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-300",
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: keyof typeof variantClasses;
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
    return (
        <div
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest transition-colors ${variantClasses[variant]} ${className}`}
            {...props}
        />
    );
}

export { Badge };
