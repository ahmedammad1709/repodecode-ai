import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { getCurrentUser, getUserProfile, createGitHubUserProfile } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export type DashTab = "overview" | "repos" | "editor" | "health" | "templates" | "history" | "connection" | "billing" | "settings";

const tabComponents: Record<DashTab, React.FC<{ userId: string; userName: string; userEmail: string }>> = {
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
  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          navigate("/login");
          return;
        }

        // Get user profile from database
        let { data: profile, error } = await getUserProfile(user.id);

        // If profile doesn't exist, check if this is a GitHub OAuth user
        if (error || !profile) {
          // Check if user has GitHub provider
          const providers = user.identities?.map((id: any) => id.provider) || [];
          if (providers.includes('github')) {
            // Create profile for GitHub user
            const { data: newProfile, error: createError } = await createGitHubUserProfile(user);
            if (createError) {
              console.error('Failed to create GitHub user profile:', createError);
              // Still set user data from auth metadata as fallback
              setUserId(user.id);
              setUserEmail(user.email || "");
              setUserName(user.user_metadata?.full_name || user.user_metadata?.user_name || user.email?.split("@")[0] || "User");
            } else if (newProfile) {
              profile = newProfile;
            }
          } else {
            // For email/password users without profile, use auth metadata
            setUserId(user.id);
            setUserEmail(user.email || "");
            setUserName(user.user_metadata?.display_name || user.email?.split("@")[0] || "User");
          }
        }

        // Set user data from profile if available
        if (profile) {
          setUserId(user.id);
          setUserEmail(profile.email);
          setUserName(profile.name);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const ActiveComponent = tabComponents[activeTab];

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <DashboardHeader userName={userName} userEmail={userEmail} />
        <main className="flex-1 overflow-auto p-6">
          <ActiveComponent userId={userId} userName={userName} userEmail={userEmail} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
