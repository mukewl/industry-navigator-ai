import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SearchPanel } from "@/components/search/SearchPanel";
import { SustainabilityBrief } from "@/components/brief/SustainabilityBrief";
import { AccountDashboard } from "@/components/dashboard/AccountDashboard";
import { ArchitectureView } from "@/components/architecture/ArchitectureView";
import { RoadmapView } from "@/components/dashboard/RoadmapView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [previousTab, setPreviousTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Called immediately when the user submits a company name
  const handleSearch = (_query: string, _type: "industry" | "company") => {
    const query = _query.trim();
    if (!query) return;
    setSearchQuery(query);
    setHasSearched(true);
    setPreviousTab(activeTab);
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
            setPreviousTab(activeTab);
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
          key={searchQuery}
          companyName={searchQuery}
          onBack={(returnTo) => setActiveTab(returnTo)}
          returnTo={previousTab}
        />
      );
    }

    // Direct links to Briefs
    const briefTabMap: Record<string, string> = {
      "renault-brief": "Renault",
      "carrefour-brief": "Carrefour",
      "stellantis-brief": "Stellantis",
      "totalenergies-brief": "TotalEnergies",
      "saintgobain-brief": "Saint-Gobain",
      "schneiderelectric-brief": "Schneider Electric",
      "veolia-brief": "Veolia",
      "airfranceklm-brief": "Air France-KLM",
      "danone-brief": "Danone",
      "loreal-brief": "L'Oréal",
    };
    if (activeTab in briefTabMap) {
      return (
        <SustainabilityBrief
          key={activeTab}
          companyName={briefTabMap[activeTab]}
          onBack={(returnTo) => setActiveTab(returnTo)}
          returnTo={previousTab}
        />
      );
    }

    // System Architecture View
    if (activeTab === "architecture") {
      return <ArchitectureView />;
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
