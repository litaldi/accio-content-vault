
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Eye, EyeOff, Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Access Your Knowledge Base | Accio</title>
        <meta name="description" content="Sign in to your Accio account to access your AI-powered knowledge management system." />
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Side - Form */}
          <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              {/* Logo */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="text-2xl font-bold">Accio</span>
                </Link>
              </div>

              <Card className="shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription>
                    Sign in to access your knowledge base
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          disabled={isLoading}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t text-center space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-primary hover:underline font-medium">
                        Create one now
                      </Link>
                    </p>
                    <p className="text-sm">
                      <Link to="/forgot-password" className="text-primary hover:underline">
                        Forgot your password?
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/5 to-blue-600/5 p-8">
            <div className="max-w-md text-center">
              <Brain className="h-32 w-32 text-primary mx-auto mb-8" />
              <h2 className="text-3xl font-bold mb-6">Your Knowledge Awaits</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Access your AI-organized knowledge base and discover insights you never knew existed.
              </p>
              
              <div className="bg-background/50 rounded-lg p-6">
                <p className="text-sm text-muted-foreground italic">
                  "Accio has become an essential part of my daily workflow. I can't imagine working without it."
                </p>
                <div className="mt-3">
                  <div className="font-medium">Maria Garcia</div>
                  <div className="text-xs text-muted-foreground">Product Manager, InnovateCorp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
