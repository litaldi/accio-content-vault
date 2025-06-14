
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SecureLoginForm } from '@/components/auth/SecureLoginForm';
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

  return (
    <>
      <Helmet>
        <title>Create Account - Accio</title>
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
          </div>

          <SecureLoginForm />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
