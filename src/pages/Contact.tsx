
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | ReadSmart</title>
        <meta name="description" content="Get in touch with the ReadSmart team. We're here to help with any questions or feedback you may have." />
      </Helmet>

      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5" />
                <h3 className="font-medium">Email</h3>
              </div>
              <p className="text-muted-foreground">contact@readsmart.app</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Phone className="h-5 w-5" />
                <h3 className="font-medium">Phone</h3>
              </div>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <User className="h-5 w-5" />
                <h3 className="font-medium">Support Hours</h3>
              </div>
              <p className="text-muted-foreground">Mon-Fri: 9am - 5pm EST</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <h3 className="text-xl font-medium">Thank you for your message!</h3>
                    <p>We've received your inquiry and will respond as soon as possible.</p>
                    <Button onClick={() => setSubmitted(false)}>Send another message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        aria-describedby="name-error"
                        value={formState.name}
                        onChange={handleInputChange}
                        className={errors.name ? "border-destructive" : ""}
                        aria-invalid={!!errors.name}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        aria-describedby="email-error"
                        value={formState.email}
                        onChange={handleInputChange}
                        className={errors.email ? "border-destructive" : ""}
                        aria-invalid={!!errors.email}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Message <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        aria-describedby="message-error"
                        value={formState.message}
                        onChange={handleInputChange}
                        className={errors.message ? "border-destructive" : ""}
                        aria-invalid={!!errors.message}
                        placeholder="How can we help you?"
                        rows={5}
                      />
                      {errors.message && (
                        <p id="message-error" className="text-sm text-destructive">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit"
                      loading={isSubmitting}
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
