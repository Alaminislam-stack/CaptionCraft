import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Copy, Check, Clock, Zap, Crown, User as UserIcon, LogOut, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstanceUtility from "@/utils/axiosInstanceUtility";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [captions, setCaptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const response = await axiosInstanceUtility.get("/user/profile");
        if (response.data.success) {
          setCaptions(response.data.captions || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCaptions();
    }
  }, [user]);

  const handleCopy = (id: string, result: string) => {
    navigator.clipboard.writeText(result);
    setCopiedId(id);
    toast.success("Caption copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (authLoading || (loading && user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Protected route will handle redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* User Profile Header */}
          <div className="mb-8 flex flex-col md:flex-row items-center gap-6 bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
            <Avatar className="w-20 h-20 border-4 border-primary/20 bg-primary/10">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl font-bold text-primary">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left space-y-1 flex-grow">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-2 py-0">
                  Active Account
                </Badge>
              </div>
            </div>

            <div className="hidden md:flex gap-4">
              <div className="text-center px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xl font-bold text-primary">{user.credits}</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Credits</p>
              </div>
              <div className="text-center px-4 py-2 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <p className="text-xl font-bold text-blue-500">{user.plan || "Free"}</p>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">Current Plan</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Usage Stats (Mobile & Tablet) */}
              <div className="grid grid-cols-2 gap-4 lg:hidden">
                <div className="bg-card p-4 rounded-xl border border-border/50 text-center">
                  <p className="text-2xl font-bold text-primary">{user.credits}</p>
                  <p className="text-xs text-muted-foreground">Credits Remaining</p>
                </div>
                <div className="bg-card p-4 rounded-xl border border-border/50 text-center">
                  <p className="text-2xl font-bold text-blue-500 capitalize">{user.plan || "Free"}</p>
                  <p className="text-xs text-muted-foreground">Current Plan</p>
                </div>
              </div>

              {/* History */}
              <div className="bg-card rounded-2xl shadow-card p-6 animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Captions
                  </h2>
                  <Link to="/generate">
                    <Button variant="ghost" size="sm" className="text-primary text-xs">
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {captions.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-border/50 rounded-xl">
                      <Sparkles className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">No captions generated yet</p>
                      <Link to="/generate">
                        <Button variant="link" className="text-primary mt-2">Create your first caption</Button>
                      </Link>
                    </div>
                  ) : (
                    captions.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-background rounded-xl border border-border hover:border-primary/30 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <p className="text-foreground text-sm line-clamp-2 mb-2 leading-relaxed">
                              {item.result}
                            </p>
                            <div className="flex items-center gap-3 text-[10px] font-medium text-muted-foreground">
                              <span className="bg-primary/5 text-primary px-2 py-0.5 rounded uppercase">{item.tone}</span>
                              <span className="bg-muted px-2 py-0.5 rounded uppercase">{item.language}</span>
                              <span>•</span>
                              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(item.id, item.result)}
                            className="shrink-0 group-hover:bg-primary/10 transition-colors"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-4 h-4 text-primary" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-card rounded-2xl shadow-card p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link to="/generate">
                    <Button className="w-full flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generate New Caption
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 hover:border-red-200"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout Account
                  </Button>
                </div>
              </div>

              {/* Upgrade CTA */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <Crown className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Upgrade to Pro
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Get unlimited captions, full history access, and priority AI processing for your brand.
                </p>
                <Link to="/pricing">
                  <Button variant="accent" className="w-full shadow-lg shadow-accent/20">
                    Upgrade Now
                  </Button>
                </Link>
              </div>

              {/* Plan Info */}
              <div className="bg-card rounded-2xl shadow-card p-6 animate-slide-up" style={{ animationDelay: "0.25s" }}>
                <h2 className="text-lg font-bold text-foreground mb-4">
                  Current Plan
                </h2>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground capitalize">{user.plan || "Free"} Plan</p>
                    <p className="text-xs text-muted-foreground">10 daily credits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
