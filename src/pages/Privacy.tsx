
import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | ReadSmart</title>
        <meta name="description" content="ReadSmart privacy policy: How we collect, use, and protect your data." />
      </Helmet>
      
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: May 19, 2025</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="prose prose-gray max-w-none">
              <p>
                At ReadSmart, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
                and safeguard your information when you use our service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Create an account or register for our services</li>
                <li>Use interactive features of our service</li>
                <li>Communicate with us directly</li>
                <li>Subscribe to our newsletters or other communications</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
              <p>
                We may use information that we collect about you to:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions, and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products and services</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">Data Sharing and Disclosure</h2>
              <p>
                We may share personal information in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>With service providers, consultants, and other third-party vendors</li>
                <li>To comply with applicable laws and regulations</li>
                <li>To protect the rights, property, or safety of ReadSmart, our users, or others</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal information.
                However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>The right to access your personal information</li>
                <li>The right to rectify inaccurate personal information</li>
                <li>The right to request the deletion of your personal information</li>
                <li>The right to object to the processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date at the top.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@readsmart.app<br />
                <strong>Address:</strong> 123 Privacy Lane, Data City, 45678
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Privacy;
