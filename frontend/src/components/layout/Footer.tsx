import { Link } from '@tanstack/react-router';
import { Heart, Phone, MapPin } from 'lucide-react';
import { SiYoutube, SiFacebook, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'unknown-app'
  );

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">World Sathi Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your complete collection of professional tools for everyday tasks.
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://youtube.com/@worldsathitools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="YouTube"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/worldsathitools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/worldsathitools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-foreground block">
                Home
              </Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground block">
                Dashboard
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground block">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground block">
                Contact Us
              </Link>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-semibold mb-4">Contact Details</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>+1 (555) 123-4567</div>
                  <div className="text-xs">WhatsApp Available</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  123 Tech Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <Link to="/legal/privacy" className="text-muted-foreground hover:text-foreground block">
                Privacy Policy
              </Link>
              <Link to="/legal/terms" className="text-muted-foreground hover:text-foreground block">
                Terms of Service
              </Link>
              <Link to="/legal/cookies" className="text-muted-foreground hover:text-foreground block">
                Cookie Policy
              </Link>
              <Link to="/legal/data-rights" className="text-muted-foreground hover:text-foreground block">
                Data Rights
              </Link>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {currentYear} World Sathi Tools. Built with{' '}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
