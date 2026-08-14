import { SettingsForm } from "@/components/settings/settings-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { getSessionUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your Threadly profile and account.
      </p>

      <div className="mt-6 space-y-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              This is how other people see you across Threadly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm currentUsername={user.username} />
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              {user.displayName ?? "Signed in"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Sign out</p>
                <p className="text-sm text-muted-foreground">
                  You&apos;ll need to sign back in to post, vote, or comment.
                </p>
              </div>
              <Link
                href="/auth/sign-out"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Sign out
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
