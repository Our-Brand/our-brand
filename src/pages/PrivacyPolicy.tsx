import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Card className="bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.4)] max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-4xl bg-gradient-brand bg-clip-text text-transparent">
              Privacy Policy
            </CardTitle>
            <p className="text-muted-foreground mt-2">Last updated: November 2024</p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="space-y-6 text-foreground/80">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including when you create an account,
                  use our services, communicate with us, or participate in any interactive features of our services.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Personal identification information (Name, email address, phone number)</li>
                  <li>Professional information</li>
                  <li>Communication data</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Communicate with you about products, services, and events</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
                <p>
                  We do not share your personal information with third parties except as described in this policy.
                  We may share information in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>With your consent or at your direction</li>
                  <li>With service providers who perform services on our behalf</li>
                  <li>For legal reasons or to prevent harm</li>
                  <li>In connection with a business transaction</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect the security of your
                  personal information. However, please note that no method of transmission over the Internet or
                  method of electronic storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">5. Your Rights</h2>
                <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Correct or update your personal information</li>
                  <li>Delete your personal information</li>
                  <li>Object to or restrict certain processing</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">6. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <span className="text-primary">contact@company.com</span>
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
