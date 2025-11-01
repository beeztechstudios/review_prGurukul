import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Shield, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
          if (isLogin) {
            const { error } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            if (error) throw error;
            toast.success("Logged in successfully");
          } else {
            const { error } = await supabase.auth.signUp({
              email,
              password,
            });
            if (error) throw error;
            toast.success("Account created! Please log in.");
            setIsLogin(true);
          }
        } catch (error: any) {
          toast.error(error.message || "Authentication failed");
        } finally {
          setLoading(false);
        }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  NFC Review System
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Secure admin portal for managing customer reviews and NFC card generation
                </p>
              </div>
            </div>

            {/* <div className="space-y-4 pt-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Secure Authentication</h3>
                  <p className="text-gray-600 text-sm">Enterprise-grade security for your data</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-time Management</h3>
                  <p className="text-gray-600 text-sm">Instant updates and analytics</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Advanced Controls</h3>
                  <p className="text-gray-600 text-sm">Comprehensive admin capabilities</p>
                </div>
              </div>
            </div> */}

            {/* Partner Logos */}
            <div className="pt-12 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-6">Powered by</p>
              <div className="flex items-center space-x-8">
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-none border-gray-200">
                   <img className="w-44" src="/logo.JPG" alt="" />
                </div>
               
                <div className="bg-white px-6 py-3 rounded-lg shadow-sm border-none border-gray-200">
                  <img className="w-52" src="https://www.beeztech.studio/_next/image?url=%2FLogo_Black.png&w=384&q=75" alt="" />
                  {/* <div className="text-xl font-bold text-indigo-600">BeeZtech</div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-xl border-gray-200 shadow-2xl">
              <div className="p-8 space-y-6">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center justify-center space-x-3 mb-4">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-lg font-bold text-blue-600">PrGurukul</div>
                  </div>
                 
                  {/* <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-lg font-bold text-indigo-600">BeeZtech</div>
                  </div> */}
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {isLogin 
                      ? "Sign in to access your admin dashboard" 
                      : "Register for admin panel access"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@prgurukul.com"
                        className="pl-11 h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        minLength={6}
                        className="pl-11 h-12 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-gray-600">Remember me</span>
                      </label>
                      <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : isLogin ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        {isLogin ? "New to the platform?" : "Already have access?"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    {isLogin
                      ? "Create admin account →"
                      : "Sign in to existing account →"}
                  </button>
                </form>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-center text-gray-500">
                    Protected by enterprise-grade security. Your data is encrypted and secure.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;