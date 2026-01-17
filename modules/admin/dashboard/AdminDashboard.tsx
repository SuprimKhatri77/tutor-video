"use client"
import { cn } from "@/lib/utils";
import InfoCard from "./InfoCard";
import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "@/dal/blogs/get-all-blogs";
import { getAllEvents } from "@/dal/events/get-all-events";
import { Suspense } from "react";
import AdminDashboardChartSuspense, { AdminDashboardPieChartSuspense, InfoCardSuspense } from "@/components/suspense/SuspenseAdminDashboard";
import { AdminDashboardPieChart } from "@/components/graphcomponents/DashboardPieChart";
import { ChartAreaAdminDashboard } from "@/components/graphcomponents/AdminDashboardChart";


export default function AdminDashboard() {
  
 const {data: blogs, isLoading: fetching_blogs, error: blog_err} = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    retry: 1
 })
 const {data: events, isLoading: fetching_events, error: events_err} = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
    retry: 1
 })
 


    return (
            <section className="space-y-6 p-6">
             
             
                <div className="grid md:grid-cols-2 gap-6">

                <Suspense fallback={<AdminDashboardPieChartSuspense />}>

                 <AdminDashboardPieChart blogsCount={blogs?.length || 0} eventsCount={events?.length || 0}/>
                </Suspense>
                <Suspense fallback={<AdminDashboardChartSuspense />}>

                 <ChartAreaAdminDashboard blogs={blogs || []} events={events || []}/>
                </Suspense>
                </div>


            
               
            
            </section>
    );
}
