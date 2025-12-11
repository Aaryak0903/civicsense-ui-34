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

const categoryData = [
  { name: "Pothole", count: 45, percentage: 28 },
  { name: "Street Light", count: 32, percentage: 20 },
  { name: "Garbage", count: 28, percentage: 17 },
  { name: "Water Leakage", count: 25, percentage: 15 },
  { name: "Drainage", count: 18, percentage: 11 },
  { name: "Other", count: 14, percentage: 9 },
];

const regionData = [
  { name: "Downtown", total: 48, resolved: 42 },
  { name: "Suburb East", total: 35, resolved: 28 },
  { name: "North District", total: 30, resolved: 25 },
  { name: "Industrial Zone", total: 28, resolved: 20 },
  { name: "South Area", total: 21, resolved: 18 },
];

export default function AnalyticsPage() {
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

          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Issues"
              value="162"
              icon={FileText}
              variant="primary"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Resolved"
              value="133"
              icon={CheckCircle2}
              variant="secondary"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Avg Resolution Time"
              value="2.4 days"
              icon={Clock}
              variant="accent"
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="Resolution Rate"
              value="82%"
              icon={TrendingUp}
              variant="default"
              trend={{ value: 5, isPositive: true }}
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
                {categoryData.map((category, index) => (
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
                {regionData.map((region, index) => {
                  const percentage = Math.round((region.resolved / region.total) * 100);
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
                  Monthly Issue Trend
                </h2>
              </div>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                  (month, index) => {
                    const height = Math.floor(Math.random() * 60) + 40;
                    return (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <div className="w-full h-32 flex items-end">
                          <div
                            className="w-full gradient-hero rounded-t-md transition-all duration-500 hover:opacity-80"
                            style={{ height: `${height}%` }}
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
        </div>
      </main>
    </div>
  );
}
