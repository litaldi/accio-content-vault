
import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  titleClassName?: string
  subtitleClassName?: string
  className?: string
  eyebrow?: string
  eyebrowClassName?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  titleClassName,
  subtitleClassName,
  className,
  eyebrow,
  eyebrowClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(
      "space-y-3 mb-8 md:mb-12",
      align === "center" && "text-center mx-auto max-w-3xl",
      align === "left" && "text-left",
      align === "right" && "text-right ml-auto",
      className
    )}>
      {eyebrow && (
        <p className={cn(
          "text-sm font-semibold text-primary uppercase tracking-wider",
          eyebrowClassName
        )}>
          {eyebrow}
        </p>
      )}
      
      <h2 className={cn(
        "heading-2",
        titleClassName
      )}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn(
          "body-lg max-w-3xl",
          align === "center" && "mx-auto",
          align === "right" && "ml-auto",
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
