import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Mail, Lock, User, ArrowRight, ArrowLeft, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, registerWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await register({ name, email, password });
    setIsLoading(false);
    if (result.user) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            Caption<span className="text-primary">Craft</span>
          </span>
        </Link>

        {/* Form Card */}
        <div className="bg-card rounded-2xl shadow-card p-6 sm:p-8 animate-fade-in">
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Create your account
              </h1>
              <p className="text-muted-foreground">
                Start generating amazing captions for free
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6 flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (credentialResponse.credential) {
                    const result = await registerWithGoogle(credentialResponse.credential);
                    if (result.user) {
                      navigate("/profile");
                    }
                  }
                }}
                onError={() => {
                  toast.error("Google Registration Failed");
                }}
                useOneTap
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
                width="384"
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-11 h-12 bg-background border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-12 bg-background border-border/50 focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-foreground mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 bg-background border-border/50 focus:border-primary"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              {/* Password Requirements */}
              <div className="flex flex-wrap gap-3 text-xs">
                <span className={`flex items-center gap-1 ${password.length >= 8 ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <Check className="w-3.5 h-3.5" /> 8+ characters
                </span>
                <span className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <Check className="w-3.5 h-3.5" /> Uppercase
                </span>
                <span className={`flex items-center gap-1 ${/[0-9]/.test(password) ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <Check className="w-3.5 h-3.5" /> Number
                </span>
              </div>

              <Button type="submit" className="w-full h-12 text-base mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Register
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>

            <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </>
        </div>
      </div>
    </div>
  );
};

export default Register;