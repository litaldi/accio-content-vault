
import React from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | ReadSmart</title>
        <meta name="description" content="ReadSmart terms and conditions of service." />
      </Helmet>
      
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: May 19, 2025</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="prose prose-gray max-w-none">
              <p>
                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the ReadSmart website
                and application operated by ReadSmart, Inc.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms,
                then you do not have permission to access or use our Service.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4">2. Intellectual Property</h2>
              <p>
                Our Service and its original content, features, and functionality are and will remain the exclusive property of ReadSmart
                and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ReadSmart.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">3. User Accounts</h2>
              <p>
                When you create an account with us, you guarantee that the information you provide is accurate, complete, and current at all times.
                Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction
                of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur
                under your account and/or password.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">4. Content and User Submissions</h2>
              <p>
                Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos,
                or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">5. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability,
                under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall ReadSmart, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
                incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content
                of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions
                or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed
                of the possibility of such damage.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">7. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide
                at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>

              <h2 className="text-xl font-semibold mt-6 mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> legal@readsmart.app<br />
                <strong>Address:</strong> 123 Legal Avenue, Terms City, 45678
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Terms;
