import { CitizenSidebar } from "@/components/layout/CitizenSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { User as UserIcon, Bell as BellIcon, Info as InfoIcon, ShieldCheck as ShieldCheckIcon } from "lucide-react";

export default function CitizenSettings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleSave = () => {
    // Ideally this should update via API
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="flex min-h-screen bg-background font-sans relative isolate overflow-hidden">
      <CitizenSidebar />

      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0 animate-slide-up">
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your account and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Settings Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Section */}
              <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-primary" /> Profile Information
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name || ""} disabled className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue={user?.email || ""} disabled className="bg-muted/50" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={user?.phone || ""} disabled className="bg-muted/50" />
                  </div>
                </div>
                <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
                  <InfoIcon className="h-4 w-4 text-primary mt-0.5" />
                  <p>Profile details are currently managed by the administration to ensure data integrity. Please contact support for changes.</p>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-card rounded-xl shadow-sm border border-border p-6 md:p-8">
                <h2 className="font-display text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-primary" /> Notification Preferences
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive status updates via email
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
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Get urgent alerts directly to your phone
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
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive real-time browser notifications
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

                <div className="mt-8 pt-4 border-t border-border/50">
                  <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Info & Security */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <h3 className="font-semibold text-foreground mb-3 text-sm flex items-center gap-2">
                  <ShieldCheckIcon className="h-4 w-4 text-emerald-500" /> Account Security
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Your account is protected with industry-standard encryption. We regularly audit our security systems to ensure your data stays safe.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs h-9">
                    Change Password
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs h-9 text-destructive hover:text-destructive hover:bg-destructive/10">
                    Deactivate Account
                  </Button>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl border border-primary/10 p-5">
                <h3 className="font-semibold text-primary mb-2 text-sm">Need Help?</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  If you have any questions about your account settings or need assistance with the platform, our support team is here to help.
                </p>
                <Button variant="secondary" size="sm" className="w-full text-xs">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
