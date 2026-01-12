"use client";

import * as React from "react";
import {
  ClockIcon,
  DraftingCompass,
  GalleryVerticalEnd,
  NotebookPenIcon,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/utils/auth-client";
import { Skeleton } from "./ui/skeleton";
import { NavMain } from "./nav-main";

const data = {
  teams: [
    {
      name: "TutorDai",
      plan: "Teacher",
    },
  ],
  navMain: [
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: NotebookPenIcon,
      isActive: true,
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: ClockIcon,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="w-full h-full rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-62.5" />
              <Skeleton className="h-4 w-62.5" />
            </div>
          </div>
        ) : (
          session && <NavUser user={session.user} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
