import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { ReposTab } from "@/components/dashboard/ReposTab";
import { EditorTab } from "@/components/dashboard/EditorTab";
import { HealthTab } from "@/components/dashboard/HealthTab";
import { TemplatesTab } from "@/components/dashboard/TemplatesTab";
import { HistoryTab } from "@/components/dashboard/HistoryTab";
import { ConnectionTab } from "@/components/dashboard/ConnectionTab";
import { BillingTab } from "@/components/dashboard/BillingTab";
import { SettingsTab } from "@/components/dashboard/SettingsTab";

export type DashTab = "overview" | "repos" | "editor" | "health" | "templates" | "history" | "connection" | "billing" | "settings";

const tabComponents: Record<DashTab, React.FC> = {
  overview: OverviewTab,
  repos: ReposTab,
  editor: EditorTab,
  health: HealthTab,
  templates: TemplatesTab,
  history: HistoryTab,
  connection: ConnectionTab,
  billing: BillingTab,
  settings: SettingsTab,
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashTab>("overview");
  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
