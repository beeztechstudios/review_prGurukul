import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, Zap, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              PR Gurukul
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground/90 mb-4">
              NFC Review System
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Simplify customer feedback collection with smart NFC technology
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-medium animate-scale-in">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Easy Reviews</h3>
              <p className="text-muted-foreground">
                One tap to start the review process
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-medium animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Instant Redirect</h3>
              <p className="text-muted-foreground">
                Smart suggestions and direct Google links
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-medium animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Admin Control</h3>
              <p className="text-muted-foreground">
                Manage all businesses from one dashboard
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/admin")}
              size="lg"
              className="bg-gradient-accent hover:opacity-90 transition-opacity text-lg h-14 px-8"
            >
              Access Admin Dashboard
            </Button>
            <p className="text-primary-foreground/70 text-sm">
              Tap an NFC card to see the customer experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
