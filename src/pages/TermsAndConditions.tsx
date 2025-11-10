import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
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
              Terms & Conditions
            </CardTitle>
            <p className="text-muted-foreground mt-2">Last updated: November 2024</p>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <div className="space-y-6 text-foreground/80">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using our services, you accept and agree to be bound by the terms and provision
                  of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">2. Use License</h2>
                <p>
                  Permission is granted to temporarily access our services for personal, non-commercial transitory viewing only.
                  This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or public display</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                  <li>Transfer the materials to another person or entity</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">3. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information.
                  Failure to do so constitutes a breach of the Terms, which may result in immediate termination
                  of your account.
                </p>
                <p className="mt-3">
                  You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive
                  property of the company and its licensors. The service is protected by copyright, trademark, and
                  other laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">5. Prohibited Uses</h2>
                <p>You may not use our services:</p>
                <ul className="list-disc pl-6 space-y-2 mt-3">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">6. Disclaimer</h2>
                <p>
                  The materials on our service are provided on an 'as is' basis. We make no warranties, expressed or
                  implied, and hereby disclaim and negate all other warranties including, without limitation, implied
                  warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
                  of intellectual property.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">7. Limitations</h2>
                <p>
                  In no event shall the company or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                  to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">8. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, without prior notice
                  or liability, under our sole discretion, for any reason whatsoever, including without limitation if you
                  breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">9. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
                  provide at least 30 days' notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-3">10. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
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

export default TermsAndConditions;
