import { PenLine, Settings, Copy } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    number: "01",
    title: "Describe Your Post",
    description:
      "Tell us about your product, service, or content you want to share.",
  },
  {
    icon: Settings,
    number: "02",
    title: "Choose Tone & Language",
    description:
      "Select your preferred tone and language (Bangla or English).",
  },
  {
    icon: Copy,
    number: "03",
    title: "Copy & Post Instantly",
    description:
      "Get your AI-generated caption with hashtags. Copy and share!",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create engaging captions in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto relative z-10">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground z-20">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
