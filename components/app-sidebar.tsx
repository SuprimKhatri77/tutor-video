"use client";

import * as React from "react";
import { ChartAreaIcon, ClockIcon, NotebookPenIcon } from "lucide-react";

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
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: ChartAreaIcon,
      isActive: true,
    },
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
        {isPending || !session ? (
          <div className="flex items-center gap-1 py-2">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          <NavUser user={session.user} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
