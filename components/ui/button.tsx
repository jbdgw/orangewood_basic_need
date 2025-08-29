import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-200 font-semibold",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border-2 border-primary text-primary bg-background shadow-sm hover:bg-primary hover:text-white transition-all duration-200 font-semibold",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90 font-semibold",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline font-medium",
    }
    
    const sizes = {
      default: "h-11 px-6 py-3 text-base",
      sm: "h-9 px-4 py-2 text-sm",
      lg: "h-12 px-8 py-3 text-lg",
      icon: "h-11 w-11",
    }

    const classes = [
      baseClasses,
      variants[variant],
      sizes[size],
      className
    ].join(" ")

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }