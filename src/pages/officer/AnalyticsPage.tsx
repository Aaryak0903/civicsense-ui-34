import { OfficerSidebar } from "@/components/layout/OfficerSidebar";
import { StatCard } from "@/components/ui/stat-card";
import {
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { issueService } from "@/services/issueService";
import { Issue } from "@/types";

export default function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['issues', 'analytics'],
    queryFn: () => issueService.getAllIssues({ limit: 1000 }), // Fetch more for analytics
  });

  const issues = data?.data || [];
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter((i: Issue) => i.status === "resolved" || i.status === "closed").length;
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  // Compute Category Data
  const categoryCounts: Record<string, number> = {};
  issues.forEach((i: Issue) => {
    const cat = i.category || "Other";
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count,
      percentage: totalIssues > 0 ? Math.round((count / totalIssues) * 100) : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6

  // Compute Region Performance
  const regionStats: Record<string, { total: number, resolved: number }> = {};
  issues.forEach((i: Issue) => {
    const region = i.region || "Unknown"; // Default per API
    if (!regionStats[region]) regionStats[region] = { total: 0, resolved: 0 };
    regionStats[region].total++;
    if (i.status === "resolved" || i.status === "closed") {
      regionStats[region].resolved++;
    }
  });

  const regionData = Object.entries(regionStats).map(([name, stats]) => ({
    name,
    total: stats.total,
    resolved: stats.resolved
  }));

  // Compute Monthly Trend (Simple count by Month)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const monthlyCounts = new Array(12).fill(0);

  issues.forEach((i: Issue) => {
    const d = new Date(i.createdAt);
    if (d.getFullYear() === currentYear) {
      monthlyCounts[d.getMonth()]++;
    }
  });

  return (
    <div className="flex min-h-screen bg-background">
      <OfficerSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Analytics
            </h1>
            <p className="text-muted-foreground mt-1">
              Insights and statistics on civic issues
            </p>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading analytics...</div>
          ) : (
            <>
              {/* Overview Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                  title="Total Issues"
                  value={totalIssues.toString()}
                  icon={FileText}
                  variant="primary"
                />
                <StatCard
                  title="Resolved"
                  value={resolvedIssues.toString()}
                  icon={CheckCircle2}
                  variant="secondary"
                />
                <StatCard
                  title="Avg Resolution Time"
                  value="N/A" // Difficult to calculate without resolvedAt date
                  icon={Clock}
                  variant="accent"
                />
                <StatCard
                  title="Resolution Rate"
                  value={`${resolutionRate}%`}
                  icon={TrendingUp}
                  variant="default"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <PieChart className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      Issues by Category
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {categoryData.length === 0 ? <p className="text-muted-foreground">No data available</p> :
                      categoryData.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-foreground">
                              {category.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {category.count} ({category.percentage}%)
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full gradient-hero rounded-full transition-all duration-500"
                              style={{ width: `${category.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Region Performance */}
                <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      Performance by Region
                    </h2>
                  </div>
                  <div className="space-y-5">
                    {regionData.length === 0 ? <p className="text-muted-foreground">No data available</p> :
                      regionData.map((region, index) => {
                        const percentage = region.total > 0 ? Math.round((region.resolved / region.total) * 100) : 0;
                        return (
                          <div key={index}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-foreground">
                                {region.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {region.resolved}/{region.total} resolved
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-secondary rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-secondary w-12 text-right">
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Monthly Trend */}
                <div className="lg:col-span-2 bg-card rounded-xl shadow-card border border-border/50 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      Monthly Issue Trend ({currentYear})
                    </h2>
                  </div>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                    {months.map(
                      (month, index) => {
                        const count = monthlyCounts[index];
                        const maxCount = Math.max(...monthlyCounts, 1);
                        const heightPercent = Math.max((count / maxCount) * 100, 5); // min 5% height

                        return (
                          <div key={index} className="flex flex-col items-center gap-2">
                            <div className="w-full h-32 flex items-end relative group">
                              {/* Tooltipish number */}
                              <div className="absolute top-0 w-full text-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                                {count}
                              </div>
                              <div
                                className="w-full gradient-hero rounded-t-md transition-all duration-500 hover:opacity-80"
                                style={{ height: `${heightPercent}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{month}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
