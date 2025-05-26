
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Shield, CheckCircle, AlertCircle, Info, Star } from 'lucide-react';

// Enterprise Typography System
export const EnterpriseTypography = {
  Hero: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold",
        "leading-tight tracking-tight",
        "bg-gradient-to-r from-foreground via-foreground to-foreground/80",
        "bg-clip-text text-transparent",
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  ),
  
  H1: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={cn(
        "text-3xl sm:text-4xl lg:text-5xl font-bold",
        "leading-tight tracking-tight text-foreground",
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  ),
  
  H2: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={cn(
        "text-2xl sm:text-3xl lg:text-4xl font-semibold",
        "leading-tight tracking-tight text-foreground",
        className
      )} 
      {...props}
    >
      {children}
    </h2>
  ),
  
  H3: ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={cn(
        "text-xl sm:text-2xl font-semibold",
        "leading-tight text-foreground",
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  ),
  
  Lead: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "text-lg sm:text-xl leading-relaxed text-muted-foreground",
        "max-w-3xl",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Body: ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={cn(
        "text-base leading-relaxed text-muted-foreground",
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Caption: ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span 
      className={cn(
        "text-sm text-muted-foreground",
        className
      )} 
      {...props}
    >
      {children}
    </span>
  ),
};

// Trust Signals Component
export const TrustSignals = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-6 text-sm text-muted-foreground", className)}>
    <div className="flex items-center gap-2">
      <Shield className="h-4 w-4 text-green-500" aria-hidden="true" />
      <span>Enterprise-grade security</span>
    </div>
    <div className="flex items-center gap-2">
      <CheckCircle className="h-4 w-4 text-blue-500" aria-hidden="true" />
      <span>SOC 2 Type II certified</span>
    </div>
    <div className="flex items-center gap-2">
      <Star className="h-4 w-4 text-yellow-500" aria-hidden="true" />
      <span>Trusted by 10,000+ teams</span>
    </div>
  </div>
);

// Enterprise Loading States
export const EnterpriseLoader = ({ 
  message = "Loading your workspace...", 
  size = "default",
  className 
}: { 
  message?: string; 
  size?: "sm" | "default" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 p-8", className)}>
      <div className="relative">
        <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-foreground">{message}</p>
        <p className="text-xs text-muted-foreground">This usually takes just a moment</p>
      </div>
    </div>
  );
};

// Status Indicators
export const StatusIndicator = ({ 
  status, 
  message,
  className 
}: { 
  status: "success" | "warning" | "error" | "info";
  message: string;
  className?: string;
}) => {
  const variants = {
    success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
    warning: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-50" },
    error: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
    info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50" }
  };

  const variant = variants[status];
  const Icon = variant.icon;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-2 rounded-lg",
      variant.bg,
      className
    )}>
      <Icon className={cn("h-4 w-4", variant.color)} />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

// Enterprise spacing system
export const EnterpriseSpacing = {
  Section: ({ 
    children, 
    className, 
    size = "default",
    background = "transparent"
  }: {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "default" | "lg" | "xl";
    background?: "transparent" | "muted" | "accent";
  }) => {
    const sizeClasses = {
      sm: "py-8 sm:py-12",
      default: "py-12 sm:py-16 lg:py-20",
      lg: "py-16 sm:py-20 lg:py-32",
      xl: "py-20 sm:py-32 lg:py-40"
    };

    const backgroundClasses = {
      transparent: "",
      muted: "bg-muted/30",
      accent: "bg-accent/10"
    };

    return (
      <section className={cn(
        sizeClasses[size],
        backgroundClasses[background],
        className
      )}>
        {children}
      </section>
    );
  },

  Container: ({ 
    children, 
    className, 
    size = "default" 
  }: {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "default" | "lg" | "full";
  }) => {
    const sizeClasses = {
      sm: "max-w-3xl",
      default: "max-w-6xl",
      lg: "max-w-7xl",
      full: "max-w-none"
    };

    return (
      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}>
        {children}
      </div>
    );
  }
};
