import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SearchPanel } from "@/components/search/SearchPanel";
import { PipelineView } from "@/components/pipeline/PipelineView";
import { SustainabilityBrief } from "@/components/brief/SustainabilityBrief";
import { AccountDashboard } from "@/components/dashboard/AccountDashboard";
import { SystemArchitecture } from "@/components/dashboard/SystemArchitecture";
import { RoadmapView } from "@/components/dashboard/RoadmapView";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Called immediately when the user submits a company name
  const handleSearch = (_query: string, _type: "industry" | "company") => {
    const query = _query.trim();
    if (!query) return;
    setSearchQuery(query);
    setIsLoading(false);
    setHasSearched(false);
    setActiveTab("pipeline");
  };

  // Called by PipelineView when all 5 steps finish and user clicks "View Sustainability Brief"
  const handlePipelineComplete = () => {
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
      return <SearchPanel onSearch={handleSearch} isLoading={isLoading} />;
    }

    // Pipeline running
    if (activeTab === "pipeline") {
      return (
        <PipelineView
          companyName={searchQuery}
          onComplete={handlePipelineComplete}
        />
      );
    }

    // Sustainability Brief (post-pipeline)
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
    <div className="min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        searchQuery={searchQuery || undefined}
        onNewSearch={handleNewSearch}
      />
      <main className="lg:pl-64">
        <div className="p-4 lg:p-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default Index;
