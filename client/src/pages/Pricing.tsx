import { Link } from "react-router-dom";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out CaptionCraft",
    icon: Sparkles,
    features: [
      "5 captions per day",
      "Bangla & English languages",
      "6 tone options",
      "Hashtag suggestions",
      "Basic support",
    ],
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For serious content creators & businesses",
    icon: Crown,
    features: [
      "Unlimited captions",
      "Full caption history",
      "Priority AI processing",
      "All languages & tones",
      "Premium support",
      "Early access to features",
    ],
    cta: "Upgrade to Pro",
    ctaVariant: "default" as const,
    popular: true,
  },
];

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital payment methods including bKash and Nagad.",
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer a 7-day money-back guarantee if you're not satisfied with the Pro plan.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Simple Pricing
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Start free and upgrade when you need more. No hidden fees.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 animate-slide-up ${
                  plan.popular
                    ? "bg-card shadow-card ring-2 ring-primary"
                    : "bg-card shadow-card"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full gradient-primary text-sm font-semibold text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    plan.popular ? "gradient-primary" : "bg-muted"
                  }`}>
                    <plan.icon className={`w-6 h-6 ${
                      plan.popular ? "text-primary-foreground" : "text-muted-foreground"
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? "gradient-primary" : "bg-primary/10"
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? "text-primary-foreground" : "text-primary"
                        }`} />
                      </div>
                      <span className={plan.popular ? "text-foreground font-medium" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.popular ? "#" : "/generate"}>
                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-soft animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
