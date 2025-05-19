
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sitemap as SitemapIcon } from "lucide-react";

const Sitemap = () => {
  const pages = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Save Content", path: "/save" },
        { name: "Collections", path: "/collections" },
        { name: "Analytics", path: "/analytics" },
      ],
    },
    {
      title: "User Account",
      links: [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
        { name: "Account Settings", path: "/settings" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Pricing", path: "/pricing" },
      ],
    },
    {
      title: "Legal & Support",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Accessibility Statement", path: "/accessibility" },
        { name: "FAQ", path: "/faq" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sitemap | ReadSmart</title>
        <meta name="description" content="Navigate through all pages and sections of the ReadSmart platform." />
      </Helmet>
      
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-2">
            <SitemapIcon className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Sitemap</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            A comprehensive map of all pages on ReadSmart
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pages.map((section, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link 
                        to={link.path} 
                        className="text-primary hover:underline flex items-center"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sitemap;
