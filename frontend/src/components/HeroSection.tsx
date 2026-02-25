import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x800.png)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/35 via-black/20 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Your Complete Digital <span className="text-accent">Toolkit</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/95 drop-shadow-md max-w-2xl mx-auto">
            Access powerful, easy-to-use tools for calculations, conversions, text processing, and more—all in one
            place
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/category/$categorySlug" params={{ categorySlug: 'calculators' }}>
              <Button size="lg" className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all">
                Explore Tools
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-white/90 hover:bg-white text-foreground shadow-xl hover:shadow-2xl transition-all border-2"
              >
                View Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-white/90">Professional Tools</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/90">Free to Use</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-white/90">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
