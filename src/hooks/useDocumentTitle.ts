
import { useEffect } from "react";

/**
 * Custom hook to update document title with application name
 * 
 * @param title The page-specific title to set
 * @param withSuffix Whether to append the app name (defaults to true)
 */
export const useDocumentTitle = (title: string, withSuffix = true) => {
  useEffect(() => {
    const appName = "Accio";
    document.title = withSuffix ? `${title} | ${appName}` : title;
    
    // Update the aria-label of the main content if it exists
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.setAttribute("aria-label", title);
    }
    
    return () => {
      // Optional: Reset to default when component unmounts
      // document.title = appName;
    };
  }, [title, withSuffix]);
};
