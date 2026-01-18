import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Caption Generator</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-slide-up">
            Generate Viral Facebook & Instagram Captions{" "}
            <span className="text-gradient">in Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            AI-powered captions in <strong>Bangla</strong> &{" "}
            <strong>English</strong> with hashtags. Perfect for businesses,
            creators, and marketers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/generate">
              <Button variant="hero" size="xl">
                Generate Caption Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="hero-outline" size="xl">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Captions Generated</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">2 Languages</p>
                <p className="text-sm text-muted-foreground">Bangla & English</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground">6 Tones</p>
                <p className="text-sm text-muted-foreground">Style Options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
