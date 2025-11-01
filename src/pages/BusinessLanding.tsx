import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const DEFAULT_MOODS = [
  { level: 1, emoji: "😡", label: "Very Unhappy" },
  { level: 2, emoji: "😕", label: "Unhappy" },
  { level: 3, emoji: "😐", label: "Neutral" },
  { level: 4, emoji: "🙂", label: "Happy" },
  { level: 5, emoji: "😍", label: "Very Happy" },
];

const BusinessLanding = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: business, isLoading } = useQuery({
    queryKey: ["business", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleMoodSelect = (moodLevel: number) => {
    navigate(`/review/${slug}/${moodLevel}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <Loader2 className="h-12 w-12 animate-spin text-primary-foreground" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center text-primary-foreground animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Business Not Found</h1>
          <p className="text-lg">This review link is not active.</p>
        </div>
      </div>
    );
  }

  // Use custom moods from Supabase (if available)
  const customMoods = business?.mood_images || [];

  const MOODS =
    customMoods.length > 0
      ? customMoods.map((img: string, i: number) => ({
          level: i + 1,
          image: img,
          label: `Mood ${i + 1}`,
        }))
      : DEFAULT_MOODS;

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl animate-fade-in">
        {/* Logo */}
        {business.logo_url && (
          <div className="flex justify-center mb-8 animate-scale-in">
            <img
              src={business.logo_url}
              alt={business.business_name}
              className="h-24 w-24 object-contain bg-white rounded-2xl p-4 shadow-medium"
            />
          </div>
        )}

        {/* Business Name */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary-foreground mb-4">
          {business.business_name}
        </h1>

        {/* Instruction */}
        <p className="text-center text-primary-foreground/90 mb-12 text-lg">
          How was your experience? Tap your mood below:
        </p>

        {/* Mood Selection Grid */}
        <div className="grid grid-cols-5 gap-3 md:gap-4">
          {MOODS.map((mood, index) => (
            <button
              key={mood.level}
              onClick={() => handleMoodSelect(mood.level)}
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center 
                         transition-all duration-300 hover:scale-110 hover:shadow-medium
                         active:scale-95 animate-slide-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {mood.image ? (
                <img
                  src={mood.image}
                  alt={`Mood ${mood.level}`}
                  className="h-10 w-10 md:h-14 md:w-14 mb-2 object-contain"
                />
              ) : (
                <span className="text-4xl md:text-6xl mb-2 group-hover:scale-110 transition-transform">
                  {mood.emoji}
                </span>
              )}
              <span className="text-xs md:text-sm text-muted-foreground text-center font-medium">
                {mood.label}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-primary-foreground/70 mt-12 text-sm">
          Your feedback helps us improve
        </p>
      </div>
    </div>
  );
};

export default BusinessLanding;
