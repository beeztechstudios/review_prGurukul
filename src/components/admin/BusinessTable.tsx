import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface BusinessTableProps {
  businesses: any[];
  onEdit: (business: any) => void;
  onRefetch: () => void;
}

const BusinessTable = ({ businesses, onEdit, onRefetch }: BusinessTableProps) => {
  const handleDelete = async (id: string, businessName: string) => {
    if (!confirm(`Delete ${businessName}? This cannot be undone.`)) return;

    try {
      const { error } = await supabase.from("businesses").delete().eq("id", id);
      if (error) throw error;
      toast.success("Business deleted successfully");
      onRefetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete business");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {businesses.map((business) => (
        <Card
          key={business.id}
          className="p-6 hover:shadow-medium transition-shadow flex flex-col justify-between"
        >
          <div className="space-y-4">
            {/* Logo */}
            {business.logo_url ? (
              <img
                src={business.logo_url}
                alt={business.business_name}
                className="h-16 w-16 object-contain rounded-lg border border-border"
              />
            ) : (
              <div className="h-16 w-16 flex items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground text-xs">
                No Logo
              </div>
            )}

            {/* Business Info */}
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {business.business_name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Niche: {business.niche}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Slug: /{business.slug}
              </p>
            </div>

            {/* Mood Images */}
            {business.mood_images && business.mood_images.length > 0 ? (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Mood Images
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {business.mood_images.slice(0, 5).map((url: string, index: number) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Mood ${index + 1}`}
                      className="w-full h-16 object-cover rounded-md border border-border"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-muted-foreground text-xs bg-gray-50 border border-dashed border-border rounded-md py-6">
                <ImageIcon className="h-4 w-4 mr-1" />
                No Mood Images
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-2 pt-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => window.open(`/${business.slug}`, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Page
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit(business)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    handleDelete(business.id, business.business_name)
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BusinessTable;
