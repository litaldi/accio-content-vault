
import * as React from "react"
import { cn } from "@/lib/utils"

const ImprovedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean
    interactive?: boolean
    padding?: "none" | "sm" | "md" | "lg" | "xl"
  }
>(({ className, hover = false, interactive = false, padding = "md", ...props }, ref) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8",
    xl: "p-10"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200",
        hover && "hover:shadow-md",
        interactive && "cursor-pointer hover:shadow-lg hover:-translate-y-1 active:translate-y-0",
        paddingClasses[padding],
        className
      )}
      {...props}
    />
  )
})
ImprovedCard.displayName = "ImprovedCard"

const ImprovedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 pb-4", className)}
    {...props}
  />
))
ImprovedCardHeader.displayName = "ImprovedCardHeader"

const ImprovedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    size?: "sm" | "md" | "lg" | "xl"
  }
>(({ className, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl", 
    lg: "text-2xl",
    xl: "text-3xl"
  }

  return (
    <h3
      ref={ref}
      className={cn(
        "font-semibold leading-none tracking-tight text-card-foreground",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
})
ImprovedCardTitle.displayName = "ImprovedCardTitle"

const ImprovedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
))
ImprovedCardDescription.displayName = "ImprovedCardDescription"

const ImprovedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    padding?: "none" | "sm" | "md" | "lg" | "xl"
  }
>(({ className, padding, ...props }, ref) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6", 
    lg: "p-8",
    xl: "p-10"
  }

  return (
    <div 
      ref={ref} 
      className={cn(
        "text-card-foreground", 
        padding && paddingClasses[padding],
        className
      )} 
      {...props} 
    />
  )
})
ImprovedCardContent.displayName = "ImprovedCardContent"

const ImprovedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 border-t border-border/50", className)}
    {...props}
  />
))
ImprovedCardFooter.displayName = "ImprovedCardFooter"

export { 
  ImprovedCard, 
  ImprovedCardHeader, 
  ImprovedCardFooter, 
  ImprovedCardTitle, 
  ImprovedCardDescription, 
  ImprovedCardContent 
}
