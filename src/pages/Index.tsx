
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnhancedIllustration } from '@/components/ui/enhanced-illustration';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/use-direction';
import { useIsMobile } from '@/hooks/use-mobile';
import { sanitizeInput } from '@/lib/security';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const Index: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { direction } = useDirection();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle logout with proper error handling
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: t('common.error'),
        description: t('common.logoutFailed'),
        variant: 'destructive'
      });
    }
  };
  
  // Handle newsletter subscription with validation
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      toast({
        title: t('common.validation'),
        description: t('home.form.invalidEmail'),
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('home.form.subscribeSuccess'),
        description: t('home.form.subscribeMessage'),
      });
      
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: t('common.error'),
        description: t('home.form.subscribeFailed'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4" dir={direction}>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('home.welcome')}</h1>
        <div className="flex items-center space-x-4" style={{ gap: isMobile ? '0.5rem' : '1rem' }}>
          <ModeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full" aria-label={t('common.userMenu')}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ""} alt={user.email || "User Avatar"} />
                    <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>{t('common.account')}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/settings')}>{t('common.settings')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/collections')}>{t('common.collections')}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/analytics')}>{t('common.analytics')}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>{t('common.logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/login')}>{t('common.login')}</Button>
              <Button onClick={() => navigate('/register')}>{t('common.register')}</Button>
            </>
          )}
        </div>
      </header>
      
      <main id="main-content">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" aria-label={t('home.featuresSection')}>
          <FeaturedCard 
            title={t('home.card1.title')}
            description={t('home.card1.description')}
            illustrationName="save"
            altText={t('home.card1.alt')}
            actionLabel={t('home.card1.action')}
            onAction={() => navigate('/save')}
          />
          
          <FeaturedCard 
            title={t('home.card2.title')}
            description={t('home.card2.description')}
            illustrationName="search"
            altText={t('home.card2.alt')}
            actionLabel={t('home.card2.action')}
            onAction={() => navigate('/search')}
          />
          
          <FeaturedCard 
            title={t('home.card3.title')}
            description={t('home.card3.description')}
            illustrationName="organize"
            altText={t('home.card3.alt')}
            actionLabel={t('home.card3.action')}
            onAction={() => navigate('/collections')}
          />
        </section>
        
        <section className="mb-8" aria-labelledby="newsletter-title">
          <h2 className="text-2xl font-semibold mb-4" id="newsletter-title">{t('home.form.title')}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t('home.form.cardTitle')}</CardTitle>
              <CardDescription>{t('home.form.cardDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubscribe}>
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('home.form.emailLabel')}</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                    placeholder={t('home.form.emailPlaceholder')} 
                    aria-required="true"
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t('common.submitting') : t('home.form.submitButton')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
        
        <section aria-labelledby="testimonials-title">
          <h2 className="text-2xl font-semibold mb-4" id="testimonials-title">{t('home.testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TestimonialCard
              title={t('home.testimonials.card1.title')}
              description={t('home.testimonials.card1.description')}
              content={t('home.testimonials.card1.content')}
            />
            
            <TestimonialCard
              title={t('home.testimonials.card2.title')}
              description={t('home.testimonials.card2.description')}
              content={t('home.testimonials.card2.content')}
            />
          </div>
        </section>
      </main>
      
      <footer className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} {t('common.footer')}</p>
      </footer>
    </div>
  );
};

// Extract featured card component for reusability
interface FeaturedCardProps {
  title: string;
  description: string;
  illustrationName: string;
  altText: string;
  actionLabel: string;
  onAction: () => void;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  title,
  description,
  illustrationName,
  altText,
  actionLabel,
  onAction
}) => {
  return (
    <Card className="card-hover transition-transform hover:scale-[1.02] focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-primary">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <EnhancedIllustration name={illustrationName} alt={altText} />
      </CardContent>
      <CardFooter>
        <Button onClick={onAction}>{actionLabel}</Button>
      </CardFooter>
    </Card>
  );
};

// Extract testimonial card component for reusability
interface TestimonialCardProps {
  title: string;
  description: string;
  content: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  title,
  description,
  content
}) => {
  return (
    <Card className="card-hover transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};

export default Index;
