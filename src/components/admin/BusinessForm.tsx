import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";

interface BusinessFormProps {
  business?: any;
  onClose: () => void;
}

const BusinessForm = ({ business, onClose }: BusinessFormProps) => {
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingMood, setUploadingMood] = useState<number | null>(null);
  const [niche, setniche] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    businessName: business?.business_name || "",
    logoUrl: business?.logo_url || "",
    niche: business?.niche || "",
    googleReviewUrl: business?.google_review_url || "",
    moodImages: business?.mood_images || ["", "", "", "", ""],
  });

  // Utility to generate slug
  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Load niche from Supabase
useEffect(() => {
  const fetchniche = async () => {
    const { data, error } = await supabase
      .from("review_templates")
      .select("niche")
      .order("niche", { ascending: true });

    if (error) {
      toast.error("Failed to load niche: " + error.message);
    } else {
      // Extract unique niche names
      const uniqueniche = [...new Set(data.map((item) => item.niche))];
      setniche(uniqueniche);
    }
  };

  fetchniche();
}, []);


  // Upload file to Supabase storage and return public URL
  const uploadToSupabase = async (file: File, folder: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("business-assets")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("business-assets").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleLogoUpload = async (file: File) => {
    try {
      setUploadingLogo(true);
      const url = await uploadToSupabase(file, "logos");
      setFormData({ ...formData, logoUrl: url });
      toast.success("Logo uploaded successfully!");
    } catch (err: any) {
      toast.error("Logo upload failed: " + err.message);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleMoodUpload = async (file: File, index: number) => {
    try {
      setUploadingMood(index);
      const url = await uploadToSupabase(file, "mood-images");
      const updated = [...formData.moodImages];
      updated[index] = url;
      setFormData({ ...formData, moodImages: updated });
      toast.success(`Mood image ${index + 1} uploaded!`);
    } catch (err: any) {
      toast.error("Mood image upload failed: " + err.message);
    } finally {
      setUploadingMood(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = generateSlug(formData.businessName);
      const businessData = {
        business_name: formData.businessName,
        slug,
        logo_url: formData.logoUrl,
        niche: formData.niche,
        google_review_url: formData.googleReviewUrl,
        mood_images: formData.moodImages.filter((url) => url.trim() !== ""),
      };

      if (business) {
        const { error } = await supabase.from("businesses").update(businessData).eq("id", business.id);
        if (error) throw error;
        toast.success("Business updated successfully!");
      } else {
        const { error } = await supabase.from("businesses").insert([businessData]);
        if (error) throw error;
        toast.success(`Business created! URL: ${window.location.origin}/${slug}`);
      }

      onClose();
    } catch (error: any) {
      toast.error(error.message || "Failed to save business");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-6">{business ? "Edit Business" : "Add New Business"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            required
          />
          <p className="text-sm text-muted-foreground">
            URL will be: /{generateSlug(formData.businessName) || "business-name"}
          </p>
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Business Logo</Label>
          <div className="flex items-center gap-3">
            <label className="h-20 w-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary transition">
              {uploadingLogo ? (
                <Loader2 className="animate-spin text-primary h-6 w-6" />
              ) : formData.logoUrl ? (
                <img src={formData.logoUrl} alt="Logo" className="h-full w-full object-cover rounded-lg" />
              ) : (
                <Upload className="text-gray-400 h-6 w-6" />
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleLogoUpload(file);
                }}
              />
            </label>
            {formData.logoUrl && <p className="text-sm text-muted-foreground truncate w-48">{formData.logoUrl}</p>}
          </div>
        </div>

        {/* Dynamic Niche Dropdown */}
        <div className="space-y-2">
          <Label htmlFor="niche">Niche *</Label>
          <Select
            value={formData.niche}
            onValueChange={(value) => setFormData({ ...formData, niche: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select business niche" />
            </SelectTrigger>
            <SelectContent>
              {niche.length > 0 ? (
                niche.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {niche.charAt(0).toUpperCase() + niche.slice(1)}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="loading" disabled>
                  Loading niche...
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Google Review URL */}
        <div className="space-y-2">
          <Label htmlFor="googleReviewUrl">Google Review URL *</Label>
          <Input
            id="googleReviewUrl"
            type="url"
            value={formData.googleReviewUrl}
            onChange={(e) => setFormData({ ...formData, googleReviewUrl: e.target.value })}
            required
          />
        </div>

        {/* Mood Uploads */}
        <div className="space-y-2">
  <Label>Upload Custom Mood Images (optional, up to 5)</Label>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
    {formData.moodImages.map((url, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed 
                   border-gray-300 rounded-xl h-32 relative overflow-hidden hover:border-primary transition"
      >
        {uploadingMood === index ? (
          <Loader2 className="animate-spin text-primary h-6 w-6" />
        ) : url ? (
          <>
            <img src={url} alt={`Mood ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
            <button
              type="button"
              onClick={() => {
                const updated = [...formData.moodImages];
                updated[index] = "";
                setFormData({ ...formData, moodImages: updated });
              }}
              className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded hover:bg-black/80"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500 text-center">Upload Mood {index + 1}</span>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleMoodUpload(file, index);
              }}
            />
          </>
        )}
      </div>
    ))}
  </div>
  <p className="text-xs text-muted-foreground pt-1">
    Tip: Upload environment or product photos related to your business.
  </p>
</div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-gradient-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {business ? "Update Business" : "Create Business"}
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BusinessForm;
