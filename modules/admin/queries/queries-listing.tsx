"use client";

import { useState } from "react";
import { Search, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { QueryDetailPage } from "./query-detail";
import { ContactUsSelectType } from "@/db/schema";

const formatDate = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

type Props = {
  queries: ContactUsSelectType[] | [];
};
export const QueriesListPage = ({ queries }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const filteredQueries = queries.filter(
    (query) =>
      query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (selectedQuery) {
    const query = queries.find((q) => q.id === selectedQuery);
    if (query) {
      return (
        <QueryDetailPage query={query} onBack={() => setSelectedQuery(null)} />
      );
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Contact Queries
          </h1>
          <p className="text-slate-600">
            Manage and respond to customer inquiries
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Total Queries</div>
            <div className="text-2xl font-bold text-slate-900">
              {queries.length}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">Today</div>
            <div className="text-2xl font-bold text-slate-900">
              {
                queries.filter((q) => {
                  const today = new Date();
                  return q.createdAt.toDateString() === today.toDateString();
                }).length
              }
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <div className="text-sm text-slate-600 mb-1">This Week</div>
            <div className="text-2xl font-bold text-slate-900">
              {
                queries.filter((q) => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return q.createdAt >= weekAgo;
                }).length
              }
            </div>
          </div>
        </div>

        {/* Queries List */}
        <div className="space-y-3">
          {filteredQueries.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center border border-slate-200">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No queries found</p>
            </div>
          ) : (
            filteredQueries.map((query) => (
              <button
                key={query.id}
                onClick={() => setSelectedQuery(query.id)}
                className="w-full bg-white rounded-lg p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 text-lg truncate">
                        {query.name}
                      </h3>
                      <span className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(query.createdAt)}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium mb-1">
                      {query.subject}
                    </p>
                    <p className="text-slate-500 text-sm line-clamp-2">
                      {query.message}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
