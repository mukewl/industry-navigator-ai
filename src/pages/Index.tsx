import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SearchPanel } from "@/components/search/SearchPanel";
import { SustainabilityBrief } from "@/components/brief/SustainabilityBrief";
import { AccountDashboard } from "@/components/dashboard/AccountDashboard";
import { SystemArchitecture } from "@/components/dashboard/SystemArchitecture";
import { RoadmapView } from "@/components/dashboard/RoadmapView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Called immediately when the user submits a company name
  const handleSearch = (_query: string, _type: "industry" | "company") => {
    const query = _query.trim();
    if (!query) return;
    setSearchQuery(query);
    setHasSearched(true);
    setActiveTab("brief");
  };

  const handleNewSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
    setActiveTab("search");
  };

  const handleTabChange = (tab: string) => {
    if (tab === "search") {
      setHasSearched(false);
      setSearchQuery("");
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    // Account Manager Dashboard
    if (activeTab === "dashboard") {
      return (
        <AccountDashboard
          onNewProfile={() => setActiveTab("search")}
          onViewBrief={(companyName) => {
            setSearchQuery(companyName);
            setHasSearched(true);
            setActiveTab("brief");
          }}
        />
      );
    }

    // Home screen (Search)
    if (activeTab === "search") {
      return <SearchPanel onSearch={handleSearch} isLoading={false} />;
    }

    // Sustainability Brief (post-search)
    if (activeTab === "brief") {
      return (
        <SustainabilityBrief
          companyName={searchQuery}
          onBack={() => setActiveTab("dashboard")}
        />
      );
    }

    // Direct links to Briefs
    if (activeTab === "renault-brief") {
      return (
        <SustainabilityBrief
          companyName="Renault"
          onBack={() => setActiveTab("dashboard")}
        />
      );
    }
    
    if (activeTab === "carrefour-brief") {
      return (
        <SustainabilityBrief
          companyName="Carrefour"
          onBack={() => setActiveTab("dashboard")}
        />
      );
    }

    // System Architecture View
    if (activeTab === "architecture") {
      return <SystemArchitecture />;
    }

    if (activeTab === "roadmap") {
      return <RoadmapView />;
    }

    return <AccountDashboard onNewProfile={() => setActiveTab("search")} onViewBrief={() => {}} />;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2.5 focus:text-[0.9375rem] focus:font-normal focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-[#f5f5f7]"
      >
        Skip to main content
      </a>
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery || undefined}
        onNewSearch={handleNewSearch}
      />
      <main id="main-content" className="lg:pl-64" tabIndex={-1}>
        <div className="mx-auto w-full max-w-[1200px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
