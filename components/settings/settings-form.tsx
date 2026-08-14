"use client";

import { updateUsernameAction } from "@/lib/actions/user";
import { useActionState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function SettingsForm({ currentUsername }: { currentUsername: string }) {
  const [state, action, pending] = useActionState(updateUsernameAction, null);

  return (
    <form action={action} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">u/</span>
          <Input
            id="username"
            name="username"
            required
            minLength={3}
            maxLength={20}
            defaultValue={currentUsername}
            pattern="[a-z0-9_]+"
            placeholder="username"
            className="h-9"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Lowercase letters, numbers, and underscores only.
        </p>
      </div>

      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.ok ? (
        <p className="text-sm text-success" role="status">
          Saved.
        </p>
      ) : null}

      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
