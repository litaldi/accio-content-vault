
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Home } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

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
    <>
      <Helmet>
        <title>Page Not Found | ReadSmart</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar isLoggedIn={false} />
        
        <main className="flex-grow flex items-center justify-center px-4" id="main-content">
          <div className="max-w-md w-full">
            <EmptyState
              type="not-found"
              title="Page Not Found"
              description="Oops! The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the homepage."
              action={{ 
                label: "Return Home", 
                onClick: () => navigate("/") 
              }}
              secondaryAction={{ 
                label: "Go Back", 
                onClick: goBack 
              }}
            />
            
            <div className="mt-8 text-sm text-center text-muted-foreground">
              <p>Looking for something specific? Check our <Link to="/sitemap" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm">sitemap</Link>.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NotFound;
