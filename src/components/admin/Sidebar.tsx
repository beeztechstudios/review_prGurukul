import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onSelect: (tab: string) => void;
}

const Sidebar = ({ activeTab, onSelect }: SidebarProps) => {
  const tabs = [
    { id: "business", label: "Business Management" },
    { id: "template", label: "Template Management" },
    { id: "assets", label: "Asset Management" },
  ];

  return (
    <div className="w-64 h-full border-r bg-card p-4 flex flex-col gap-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          className={cn("justify-start", activeTab === tab.id && "bg-primary text-white")}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
