
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Home, Map } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Page Not Found | Accio</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>
      
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <Link to="/" className="text-lg font-semibold">
            Accio
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center bg-background" role="main" id="main-content">
        <div className="text-center px-4 max-w-md">
          <div className="mb-6" aria-hidden="true">
            <h1 className="text-7xl font-bold text-primary">404</h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" id="notfound-heading">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
            Please check the URL or navigate back to the homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              variant="outline" 
              onClick={goBack}
              className="flex items-center gap-2"
              aria-label="Go back to previous page"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Go Back
              </span>
            </Button>
            
            <Button size="lg" asChild>
              <Link to="/" className="flex items-center gap-2" aria-label="Return to homepage">
                <span className="inline-flex items-center gap-2">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Return Home
                </span>
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p>Looking for something specific? Check our <Link to="/sitemap" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">sitemap</Link>.</p>
          </div>
        </div>
      </main>
      
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Accio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
