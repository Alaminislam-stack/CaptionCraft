import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Copy, RefreshCw, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstanceUtility from "@/utils/axiosInstanceUtility";


const Generate = () => {
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("english");
  const [tone, setTone] = useState("friendly");
  const [length, setLength] = useState("medium");
  const [includeEmoji, setIncludeEmoji] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedHashtags, setGeneratedHashtags] = useState("");
  const [copied, setCopied] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to generate captions");
      navigate("/login");
      return;
    }

    if (!description.trim()) return;

    setIsGenerating(true);

    const response = await axiosInstanceUtility.post(
      "/caption/generate",
      { prompt: description, language, tone, captionLength: length, includeEmojis: includeEmoji }
    );

    setGeneratedCaption(response.data.caption);
    setGeneratedHashtags(response.data.hashtags);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${generatedCaption}\n\n${generatedHashtags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Caption <span className="text-gradient">Generator</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Create engaging captions for your Facebook & Instagram posts in seconds
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Input Panel */}
            <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 animate-slide-up">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Input Details
              </h2>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-foreground mb-2 block">
                    Describe your post or product
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Example: New clothing collection for Eid"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] resize-none bg-background"
                  />
                </div>

                {/* Language */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border z-50">
                      <SelectItem value="bangla">বাংলা (Bangla)</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tone */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Tone
                  </Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border z-50">
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                      <SelectItem value="islamic">Islamic</SelectItem>
                      <SelectItem value="sales">Sales/Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Length */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-2 block">
                    Caption Length
                  </Label>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border z-50">
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Emoji Toggle */}
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-foreground">
                    Include Emojis
                  </Label>
                  <Switch
                    checked={includeEmoji}
                    onCheckedChange={setIncludeEmoji}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!description.trim() || isGenerating}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Caption
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-xl font-bold text-foreground mb-6">
                Generated Caption
              </h2>

              {isGenerating ? (
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded-lg animate-pulse" />
                  <div className="h-6 bg-muted rounded-lg animate-pulse w-3/4" />
                  <div className="h-6 bg-muted rounded-lg animate-pulse w-1/2" />
                  <div className="h-20 bg-muted rounded-lg animate-pulse mt-4" />
                </div>
              ) : generatedCaption ? (
                <div className="space-y-6">
                  {/* Caption */}
                  <div className="p-4 bg-background rounded-xl border border-border">
                    <p className="text-foreground whitespace-pre-line leading-relaxed">
                      {generatedCaption}
                    </p>
                  </div>

                  {/* Hashtags */}
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      Hashtags
                    </Label>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                      <p className="text-primary font-medium text-sm break-words">
                        {generatedHashtags}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button onClick={handleCopy} className="flex-1">
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Caption
                        </>
                      )}
                    </Button>
                    <Button onClick={handleRegenerate} variant="outline" className="flex-1">
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                  </div>

                  {/* AI Note */}
                  <p className="text-xs text-muted-foreground text-center">
                    ✨ Generated by AI • CaptionCraft
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    Your AI-generated caption will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Generate;
