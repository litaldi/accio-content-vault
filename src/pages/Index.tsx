import React from 'react';
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
import { Illustration } from '@/components/ui/illustration';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/hooks/use-direction';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { direction } = useDirection();
  const isMobile = useIsMobile();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  
  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('home.welcome')}</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
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
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>{t('home.card1.title')}</CardTitle>
              <CardDescription>{t('home.card1.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Illustration name="save" alt={t('home.card1.alt')} />
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/save')}>{t('home.card1.action')}</Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>{t('home.card2.title')}</CardTitle>
              <CardDescription>{t('home.card2.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Illustration name="search" alt={t('home.card2.alt')} />
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/search')}>{t('home.card2.action')}</Button>
            </CardFooter>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>{t('home.card3.title')}</CardTitle>
              <CardDescription>{t('home.card3.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Illustration name="organize" alt={t('home.card3.alt')} />
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate('/collections')}>{t('home.card3.action')}</Button>
            </CardFooter>
          </Card>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{t('home.form.title')}</h2>
          <Card>
            <CardHeader>
              <CardTitle>{t('home.form.cardTitle')}</CardTitle>
              <CardDescription>{t('home.form.cardDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">{t('home.form.emailLabel')}</Label>
                  <Input type="email" id="email" placeholder={t('home.form.emailPlaceholder')} />
                </div>
                <Button>{t('home.form.submitButton')}</Button>
              </form>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">{t('home.testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>{t('home.testimonials.card1.title')}</CardTitle>
                <CardDescription>{t('home.testimonials.card1.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t('home.testimonials.card1.content')}</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>{t('home.testimonials.card2.title')}</CardTitle>
                <CardDescription>{t('home.testimonials.card2.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t('home.testimonials.card2.content')}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="mt-8 text-center">
        <p>&copy; {new Date().getFullYear()} {t('common.footer')}</p>
      </footer>
    </div>
  );
};

export default Index;
