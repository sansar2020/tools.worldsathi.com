import { Users, Target, Heart, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-background py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/assets/generated/about-hero.dim_1200x400.png)' }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-muted-foreground">
              Empowering users with professional-grade tools for everyday tasks
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p>
              Welcome to World Sathi Tools, your comprehensive collection of professional tools designed to make everyday tasks easier, faster, and more efficient. We believe that powerful tools should be accessible to everyone, which is why we've created a platform that brings together the most useful utilities in one place.
            </p>
            <p>
              Our mission is to provide high-quality, easy-to-use tools that help individuals and businesses accomplish their goals without the need for complex software or expensive subscriptions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  To democratize access to professional-grade tools, making productivity and efficiency available to everyone, everywhere.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We prioritize simplicity, reliability, and user experience. Every tool is crafted with care to ensure it meets the highest standards.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join thousands of users who trust our platform for their daily productivity needs. We're constantly growing and improving based on your feedback.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Our Commitment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're committed to maintaining free access to essential tools while continuously expanding our collection with new, innovative utilities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="text-left max-w-2xl mx-auto space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>No registration required for most tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Fast, reliable, and secure processing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Regular updates with new tools and features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Mobile-friendly design for on-the-go access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Privacy-focused - your data stays with you</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
