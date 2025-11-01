import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import BusinessForm from "@/components/admin/BusinessForm";
import BusinessTable from "@/components/admin/BusinessTable";
import AuthForm from "@/components/admin/AuthForm";
import TemplateForm from "@/components/admin/TemplateForm";
import Sidebar from "@/components/admin/Sidebar";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [showForm, setShowForm] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<any>(null);
  const navigate = useNavigate();

  // Auth check
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const { data: businesses, refetch } = useQuery({
    queryKey: ["businesses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!session && activeTab === "business",
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (sessionLoading) return <div className="p-10 text-center">Loading...</div>;
  if (!session) return <AuthForm />;

  return (
    <div className="min-h-screen flex">
      <Sidebar activeTab={activeTab} onSelect={setActiveTab} />

      <div className="flex-1 bg-background">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {activeTab === "business" && (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Registered Businesses</h2>
                <Button onClick={() => setShowForm(true)}>Add New</Button>
              </div>

              {showForm ? (
                <BusinessForm business={editingBusiness} onClose={() => { setShowForm(false); setEditingBusiness(null); refetch(); }} />
              ) : (
                <BusinessTable businesses={businesses || []} onEdit={(b) => { setEditingBusiness(b); setShowForm(true); }} onRefetch={refetch} />
              )}
            </>
          )}

          {activeTab === "template" && (
            <>
              <h2 className="text-xl font-semibold text-foreground mb-4">Template Management</h2>
              <TemplateForm onSave={() => toast.success("Template saved!")} />
            </>
          )}

          {activeTab === "assets" && (
            <div className="text-muted-foreground">Asset management coming soon...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
