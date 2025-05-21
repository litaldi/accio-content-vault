
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Users, Lightbulb } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | ReadSmart</title>
        <meta name="description" content="Learn more about ReadSmart, our mission, vision and the team behind the platform." />
      </Helmet>
      
      <Navbar />

      <div className="container px-4 py-8 mx-auto max-w-6xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">About ReadSmart</h1>
          <p className="text-muted-foreground text-lg">Transforming how you save and discover content</p>
        </div>

        <div className="grid gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                ReadSmart was founded in 2023 with a simple mission: to help people save, organize, and rediscover the valuable content they find online. 
                In a world of information overload, we believe that having tools to curate and manage what matters to you is essential.
              </p>
              <p>
                What started as a simple bookmarking tool has evolved into a comprehensive platform for content curation, 
                offering semantic search, AI-powered summaries, and collaborative knowledge sharing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We're on a mission to transform how people interact with online content. ReadSmart aims to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Make valuable content easy to save and retrieve when needed</li>
                <li>Eliminate the frustration of losing important articles and resources</li>
                <li>Use AI to help extract insights and connections between saved content</li>
                <li>Create a more thoughtful approach to online reading and research</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4">
                    <div className="w-24 h-24 bg-muted rounded-full mb-4"></div>
                    <h3 className="font-medium">Team Member {i}</h3>
                    <p className="text-sm text-muted-foreground">Co-Founder</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/register">Create an Account</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default About;
