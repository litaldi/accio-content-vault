
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    // Update page title for screen readers
    document.title = "Page Not Found | Accio";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-100" aria-labelledby="not-found-title">
        <div className="text-center px-4 py-10">
          <h1 id="not-found-title" className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-6">
            Sorry, the page you are looking for does not exist.
          </p>
          <a 
            href="/" 
            className="inline-flex items-center justify-center text-blue-500 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm"
          >
            <span>Return to Home</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
