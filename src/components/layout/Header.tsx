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
    <header className="glass-nav sticky top-0 z-50 flex h-12 items-center justify-between border-b border-white/10 px-4 text-white lg:hidden">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="min-h-11 min-w-11 text-white hover:bg-white/10"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 border-0 bg-black/90 p-0 shadow-apple backdrop-blur-xl backdrop-saturate-[180]">
            <Sidebar embedded activeTab={activeTab} onTabChange={onTabChange} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Leaf className="h-4 w-4 text-primary-foreground" aria-hidden />
          </div>
          <span className="text-[12px] font-normal tracking-tight text-white">Orange Business</span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewSearch}
            className="gap-1 text-[12px] font-normal text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Search className="h-3.5 w-3.5" aria-hidden />
            New
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="relative min-h-11 min-w-11 text-white/80 hover:bg-white/10 hover:text-white"
          aria-label="Notifications, 3 unread"
        >
          <Bell className="h-4 w-4" aria-hidden />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[10px] font-semibold tabular-nums leading-none text-primary-foreground">
            3
          </span>
        </Button>
      </div>
    </header>
  );
};
