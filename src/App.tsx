import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ReportIssuePage from "./pages/citizen/ReportIssuePage";
import MyIssuesPage from "./pages/citizen/MyIssuesPage";
import CitizenIssueDetails from "./pages/citizen/CitizenIssueDetails";
import CitizenSettings from "./pages/citizen/CitizenSettings";
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import OfficerIssuesPage from "./pages/officer/OfficerIssuesPage";
import IssueDetailsPage from "./pages/officer/IssueDetailsPage";
import AnalyticsPage from "./pages/officer/AnalyticsPage";
import PolicyFeedbackPage from "./pages/officer/PolicyFeedbackPage";
import OfficerSettings from "./pages/officer/OfficerSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
            <Route path="/citizen/report" element={<ReportIssuePage />} />
            <Route path="/citizen/my-issues" element={<MyIssuesPage />} />
            <Route path="/citizen/issues/:id" element={<CitizenIssueDetails />} />
            <Route path="/citizen/settings" element={<CitizenSettings />} />
            <Route path="/officer/dashboard" element={<OfficerDashboard />} />
            <Route path="/officer/issues" element={<OfficerIssuesPage />} />
            <Route path="/officer/issues/:id" element={<IssueDetailsPage />} />
            <Route path="/officer/analytics" element={<AnalyticsPage />} />
            <Route path="/officer/policy" element={<PolicyFeedbackPage />} />
            <Route path="/officer/settings" element={<OfficerSettings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
