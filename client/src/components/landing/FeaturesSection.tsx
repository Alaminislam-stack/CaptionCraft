import { Sparkles, Palette, Hash } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Caption Generator",
    description:
      "Powered by advanced AI to create engaging, platform-optimized captions that drive engagement.",
  },
  {
    icon: Palette,
    title: "Multiple Tone Selection",
    description:
      "Choose from Friendly, Professional, Romantic, Funny, Islamic, or Sales tones for any occasion.",
  },
  {
    icon: Hash,
    title: "Hashtag Suggestions",
    description:
      "Auto-generated relevant hashtags to boost your post visibility and reach more audience.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Create{" "}
            <span className="text-gradient">Viral Content</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI understands what makes social media content engaging and helps
            you create captions that resonate with your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-background shadow-card hover:shadow-lg transition-all duration-300 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
