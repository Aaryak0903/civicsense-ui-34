import { OfficerSidebar } from "@/components/layout/OfficerSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import heroBg from "@/assets/landing-bg-user.jpg";

export default function OfficerSettings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    autoAssign: false,
    darkMode: false,
  });

  const handleSave = () => {
    // Ideally update via API
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="flex min-h-screen bg-background relative isolate overflow-hidden">
      {/* Background Image with Rich Overlay - Consistent with Landing/Login */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed -z-20 opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />

      <OfficerSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Profile Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue={user?.phone || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Role</Label>
                  <Input id="department" defaultValue={user?.role?.toUpperCase() || "OFFICER"} disabled />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Profile details are managed by the administration.</p>
            </div>

            {/* Notifications */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Notifications
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via SMS
                    </p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, smsNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive browser notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-card rounded-xl shadow-card border border-border/50 p-6">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">
                Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Auto-assign Issues</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically assign new issues to available officers
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoAssign}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoAssign: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSave} variant="hero" size="lg">
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
