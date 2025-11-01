import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Loader2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MOOD_LABELS = ["Sad", "Angry", "Neutral", "Happy", "Excited"];
const MOOD_KEYS = ["sad", "angry", "neutral", "happy", "excited"];

const ReviewPage = () => {
  const { slug, mood } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const moodLevel = parseInt(mood || "3");

  // ✅ 1. Fetch business details
  const { data: business, isLoading: isBusinessLoading } = useQuery({
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

  // ✅ 2. Fetch reviews dynamically from Supabase (review_templates)
  const { data: reviewTemplate, isLoading: isReviewLoading } = useQuery({
    queryKey: ["review_templates", business?.niche],
    enabled: !!business?.niche, // run only when business.niche is available
    queryFn: async () => {
      const { data, error } = await supabase
        .from("review_templates")
        .select("moods")
        .eq("niche", business.niche)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // ✅ 3. Select a random review from the fetched data
  const getReviewFromTemplate = () => {
    if (!reviewTemplate?.moods) return null;

    const moodKey = MOOD_KEYS[moodLevel - 1]; // map moodLevel → moodKey
    const reviews = reviewTemplate.moods[moodKey] || [];

    if (reviews.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * reviews.length);
    return reviews[randomIndex];
  };

  const reviewText = getReviewFromTemplate();

  const handleCopyAndProceed = async () => {
    if (!reviewText || !business?.google_review_url) return;

    try {
      await navigator.clipboard.writeText(reviewText);
      setCopied(true);
      toast.success("Review copied! Redirecting to Google...");

      setTimeout(() => {
        window.location.href = business.google_review_url;
      }, 1500);
    } catch {
      toast.error("Failed to copy. Please copy manually.");
    }
  };

  if (isBusinessLoading || isReviewLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 shadow-medium">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        {business && (
          <div className="flex items-center gap-4">
            {business.logo_url && (
              <img
                src={business.logo_url}
                alt={business.business_name}
                className="h-16 w-16 object-contain bg-white rounded-xl p-2"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{business.business_name}</h1>
              <p className="text-primary-foreground/80">
                Rating: {MOOD_LABELS[moodLevel - 1]}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl animate-fade-in">
          {reviewText ? (
            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
                <h2 className="text-xl font-semibold mb-4 text-foreground">
                  Suggested Review:
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                  {reviewText}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCopyAndProceed}
                  size="lg"
                  className="w-full h-14 text-lg bg-gradient-accent hover:opacity-90 transition-opacity"
                  disabled={copied}
                >
                  {copied ? (
                    <>
                      <Copy className="mr-2 h-5 w-5" />
                      Copied! Redirecting...
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5" />
                      Copy & Proceed to Google
                    </>
                  )}
                </Button>

                <Button
                  onClick={() =>
                    window.open(business?.google_review_url, "_blank")
                  }
                  variant="outline"
                  size="lg"
                  className="w-full h-14 text-lg"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Go to Google Review (without copy)
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                You can edit the review before submitting on Google
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border text-center">
              <p className="text-lg text-muted-foreground mb-6">
                No review template found for this rating. Please write your own
                review.
              </p>
              <Button
                onClick={() =>
                  window.open(business?.google_review_url, "_blank")
                }
                size="lg"
                className="bg-gradient-primary"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Go to Google Review
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
