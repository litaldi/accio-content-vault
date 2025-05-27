
import React from 'react';
import { cn } from '@/lib/utils';
import { Typography, Layout } from '@/components/design-system/DesignSystem';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: { label: string; href: string }[];
  backButton?: { label: string; href: string };
  action?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumb,
  backButton,
  action,
  className
}) => {
  return (
    <header className={cn('border-b bg-background/95 backdrop-blur-sm sticky top-0 z-40', className)}>
      <Layout.Container className="py-6">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <Link 
                    to={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {backButton && (
          <Link 
            to={backButton.href}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {backButton.label}
          </Link>
        )}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Typography.H1 className="mb-2">{title}</Typography.H1>
            {description && (
              <Typography.Lead className="mb-0">{description}</Typography.Lead>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      </Layout.Container>
    </header>
  );
};

export default PageHeader;
