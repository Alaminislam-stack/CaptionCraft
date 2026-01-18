import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingPreview = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade when you need more power
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-background shadow-card animate-slide-up">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">Free</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground">5 captions per day</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground">Bangla & English</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground">6 tone options</span>
              </li>
            </ul>
            <Link to="/generate">
              <Button variant="outline" className="w-full">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-background shadow-card relative overflow-hidden animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {/* Popular badge */}
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 rounded-full gradient-primary text-xs font-semibold text-primary-foreground">
                Popular
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                Pro
                <Sparkles className="w-5 h-5 text-primary" />
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">$9</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">Unlimited captions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">Full history access</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">Priority AI processing</span>
              </li>
            </ul>
            <Link to="/pricing">
              <Button className="w-full">
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;
