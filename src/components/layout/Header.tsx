import { Menu, Search, Bell, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery?: string;
  onNewSearch?: () => void;
}

export const Header = ({ activeTab, onTabChange, searchQuery, onNewSearch }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-card/95 backdrop-blur-md px-4 lg:hidden">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-foreground hover:bg-muted">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-glow">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-foreground text-sm tracking-tight">Orange Business</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {searchQuery && (
          <Button variant="ghost" size="sm" onClick={onNewSearch} className="gap-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted">
            <Search className="h-3 w-3" />
            New
          </Button>
        )}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-muted">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[0.625rem] font-semibold tabular-nums leading-none text-primary-foreground">
            3
          </span>
        </Button>
      </div>
    </header>
  );
};

