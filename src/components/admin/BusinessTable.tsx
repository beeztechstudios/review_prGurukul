import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ExternalLink,
  Edit,
  Trash2,
  Building2,
  Globe,
  TrendingUp,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

  // Calculate stats
  const totalBusinesses = businesses.length;
  const activeBusinesses = businesses.filter((b) => b.google_review_url).length;
  const totalMoodImages = businesses.reduce(
    (acc, b) => acc + (b.mood_images?.length || 0),
    0
  );
  const niches = [...new Set(businesses.map((b) => b.niche))].length;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Businesses",
            value: totalBusinesses,
            icon: Building2,
            gradient: "from-blue-500 to-blue-600",
          },
          {
            label: "Active Links",
            value: activeBusinesses,
            icon: Globe,
            gradient: "from-indigo-500 to-indigo-600",
          },
          {
            label: "Total Images",
            value: totalMoodImages,
            icon: TrendingUp,
            gradient: "from-purple-500 to-purple-600",
          },
          {
            label: "Niches",
            value: niches,
            icon: Users,
            gradient: "from-pink-500 to-pink-600",
          },
        ].map((stat, i) => (
          <Card
            key={i}
            className={`bg-gradient-to-br ${stat.gradient} text-white border-0 shadow-lg`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table for desktop, cards for mobile */}
      <Card className="bg-white/80 backdrop-blur-xl border-gray-200 shadow-xl overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/50">
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Business</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Niche</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">URL Slug</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Mood Images</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Review Link</th>
                <th className="text-right p-4 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-12">
                    <div className="flex flex-col items-center gap-3 text-gray-500">
                      <Building2 className="w-12 h-12 text-gray-300" />
                      <p className="text-lg font-medium">No businesses yet</p>
                      <p className="text-sm">Create your first business to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                businesses.map((business) => (
                  <tr
                    key={business.id}
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                  >
                    {/* Business Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {business.logo_url ? (
                          <img
                            src={business.logo_url}
                            alt={business.business_name}
                            className="h-12 w-12 object-contain rounded-lg border border-gray-200 bg-white p-1"
                          />
                        ) : (
                          <div className="h-12 w-12 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                            <Building2 className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {business.business_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {business.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Niche */}
                    <td className="p-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {business.niche}
                      </span>
                    </td>

                    {/* Slug */}
                    <td className="p-4">
                      <code className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        /{business.slug}
                      </code>
                    </td>

                    {/* Mood Images */}
                    <td className="p-4">
                      {business.mood_images?.length ? (
                        <div className="flex items-center gap-1">
                          <div className="flex -space-x-2">
                            {business.mood_images.slice(0, 3).map((url: string, i: number) => (
                              <img
                                key={i}
                                src={url}
                                alt=""
                                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                              />
                            ))}
                          </div>
                          {business.mood_images.length > 3 && (
                            <span className="text-xs text-gray-500 ml-2">
                              +{business.mood_images.length - 3}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No images</span>
                      )}
                    </td>

                    {/* Review Link */}
                    <td className="p-4">
                      {business.google_review_url ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500">
                          <div className="w-2 h-2 bg-gray-400 rounded-full" /> Not set
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/${business.slug}`, "_blank")}
                          className="h-8 px-3 border-gray-300 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(business)}
                          className="h-8 px-3 border-gray-300 hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-600"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleDelete(business.id, business.business_name)
                          }
                          className="h-8 px-3 border-gray-300 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="block md:hidden divide-y divide-gray-200">
          {businesses.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building2 className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="font-medium">No businesses yet</p>
            </div>
          ) : (
            businesses.map((business) => (
              <div key={business.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {business.logo_url ? (
                      <img
                        src={business.logo_url}
                        alt={business.business_name}
                        className="h-10 w-10 object-contain rounded-md border border-gray-200 bg-white p-1"
                      />
                    ) : (
                      <div className="h-10 w-10 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50">
                        <Building2 className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {business.business_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        /{business.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/${business.slug}`, "_blank")}
                      className="h-8 px-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(business)}
                      className="h-8 px-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleDelete(business.id, business.business_name)
                      }
                      className="h-8 px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {business.niche}
                  </span>
                  {business.google_review_url ? (
                    <span className="inline-flex items-center gap-1 text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" /> Not set
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {businesses.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          Showing {businesses.length}{" "}
          {businesses.length === 1 ? "business" : "businesses"}
        </div>
      )}
    </div>
  );
};

export default BusinessTable;
