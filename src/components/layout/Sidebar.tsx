import { Search, LayoutDashboard, FileText, Network, Leaf, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "search", label: "New Profile", icon: Search, badge: null },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { id: "renault-brief", label: "Renault Brief", icon: FileText, badge: null },
  { id: "carrefour-brief", label: "Carrefour Brief", icon: FileText, badge: null },
  { id: "architecture", label: "System Architecture", icon: Network, badge: null },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/50 bg-sidebar hidden lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          {/* Orange Business logo: small orange circle + text */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary shadow-glow shrink-0">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-white leading-tight">Orange Business</span>
            <p className="text-[10px] text-sidebar-foreground/60 -mt-0.5">Gen AI Sustainability Profiling</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Sustainability
          </p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                activeTab === item.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
              {item.badge && (
                <Badge variant="secondary" className="text-[10px] px-2 py-0 h-5 text-orange-400 bg-orange-400/10 whitespace-nowrap">
                  {item.badge}
                </Badge>
              )}
              {!item.badge && activeTab === item.id && (
                <ChevronRight className="h-3 w-3 opacity-50" />
              )}
            </button>
          ))}
        </nav>
        
        <div className="border-t border-sidebar-border p-4 space-y-3">
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-xs font-medium text-white">8 Agents Active</p>
            </div>
            <p className="text-[10px] text-sidebar-foreground/60">
              Multi-source validated sustainability insights
            </p>
          </div>
          <p className="text-center text-[10px] text-sidebar-foreground/40">
            Orange Business | Confidential
          </p>
        </div>
      </div>
    </aside>
  );
};

