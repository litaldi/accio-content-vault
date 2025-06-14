
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '@/components/auth/forms/SignUpForm';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate('/dashboard');
  };

  const handleError = (error: string) => {
    console.error('Registration error:', error);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Accio</title>
        <meta name="description" content="Create your Accio account and start building your knowledge vault" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-blue-500/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Accio
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Join thousands building their knowledge vault
            </p>
          </div>

          <SignUpForm onSuccess={handleSuccess} onError={handleError} />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
