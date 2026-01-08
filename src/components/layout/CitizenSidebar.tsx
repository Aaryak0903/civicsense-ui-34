import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    Zap,
    ChevronLeft,
    Sparkles,
    PlusCircle,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/layout/Logo";

const sidebarLinks = [
    { href: "/citizen/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/citizen/my-issues", label: "My Issues", icon: FileText },
    { href: "/citizen/report", label: "Report Issue", icon: PlusCircle },
    { href: "/citizen/settings", label: "Settings", icon: Settings },
];

export function CitizenSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-3 p-5 border-b border-sidebar-border">
                <Logo className="h-10 w-auto" scale="scale-100" />
                {(!collapsed || isMobile) && (
                    <span className="font-display text-xl font-bold text-gradient">
                        NagrikSeva
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {sidebarLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => isMobile && setMobileOpen(false)}
                            className={cn(
                                "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                isActive
                                    ? "bg-primary/20 text-primary border border-primary/30 shadow-glow-sm"
                                    : "text-sidebar-foreground/60 hover:bg-muted hover:text-sidebar-foreground"
                            )}
                        >
                            <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                            {(!collapsed || isMobile) && (
                                <span className="font-medium">{link.label}</span>
                            )}
                            {isActive && (!collapsed || isMobile) && (
                                <Sparkles className="h-3 w-3 ml-auto text-primary animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-sidebar-border">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={cn(
                        "w-full justify-start gap-3 text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10 rounded-xl",
                        collapsed && !isMobile && "justify-center px-0"
                    )}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {(!collapsed || isMobile) && <span>Logout</span>}
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-effect">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-hero shadow-lg shadow-primary/30">
                            <Zap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="font-display text-xl font-bold text-gradient">NagrikSeva</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-xl"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-md"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    "lg:hidden fixed top-[72px] left-0 bottom-0 z-40 w-72 bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border transform transition-transform duration-300",
                    mobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarContent isMobile />
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col h-screen bg-card border-r border-border sticky top-0 transition-all duration-300 relative group/sidebar",
                    collapsed ? "w-20" : "w-72"
                )}
            >
                <div className="h-full w-full overflow-hidden">
                    <SidebarContent />
                </div>

                <Button
                    variant="default" // Changed to default for better visibility
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-4 top-24 h-8 w-8 rounded-full shadow-md z-50 border border-border"
                >
                    <ChevronLeft
                        className={cn(
                            "h-4 w-4 transition-transform",
                            collapsed && "rotate-180"
                        )}
                    />
                </Button>
            </aside>
        </>
    );
}
