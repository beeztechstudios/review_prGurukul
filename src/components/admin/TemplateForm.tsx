import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const moodsList = ["happy", "sad", "angry", "excited", "neutral"];

const TemplateForm = ({ onSave }: { onSave: () => void }) => {
  const [niche, setNiche] = useState("");
  const [reviews, setReviews] = useState<Record<string, string>>({
    happy: "",
    sad: "",
    angry: "",
    excited: "",
    neutral: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!niche.trim()) {
      toast.error("Please enter a niche");
      return;
    }

    const formattedMoods = Object.fromEntries(
      Object.entries(reviews).map(([mood, text]) => [
        mood,
        text
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      ])
    );

    try {
      setLoading(true);
      const { error } = await supabase.from("review_templates").insert([
        {
          niche,
          moods: formattedMoods,
        },
      ]);

      if (error) throw error;

      toast.success("Template added successfully");
      setNiche("");
      setReviews({ happy: "", sad: "", angry: "", excited: "", neutral: "" });
      onSave();
    } catch (err: any) {
      toast.error(err.message || "Failed to add template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Add Review Template</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium">Niche</label>
        <Input
          placeholder="e.g., Gym, Salon, Restaurant"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {moodsList.map((mood) => (
          <div key={mood} className="space-y-2">
            <label className="text-sm font-medium capitalize">{mood} Reviews</label>
            <Input
              placeholder="Write reviews, comma separated"
              value={reviews[mood]}
              onChange={(e) =>
                setReviews((prev) => ({ ...prev, [mood]: e.target.value }))
              }
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading ? "Saving..." : "Save Template"}
      </Button>
    </Card>
  );
};

export default TemplateForm;
