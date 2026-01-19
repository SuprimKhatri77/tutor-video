import { ContactUsSelectType } from "@/db/schema";
import { ArrowRight, MessageSquare } from "lucide-react";

export const QueryDetailPage = ({
  query,
  onBack,
}: {
  query: ContactUsSelectType;
  onBack: () => void;
}) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          <span className="font-medium">Back to queries</span>
        </button>

        {/* Query Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 px-6 py-6 border-b border-slate-200">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  {query.subject}
                </h1>
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="font-medium">{query.name}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm">
                    {query.createdAt.toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-600 border border-slate-200">
              <MessageSquare className="w-3.5 h-3.5" />
              Query ID: {query.id}
            </div>
          </div>

          {/* Message Content */}
          <div className="px-6 py-8">
            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
              Message
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {query.message}
              </p>
            </div>
          </div>

          {/* Actions */}
          {/* <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                Reply to Query
              </button>
              <button className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg border border-slate-300 transition-colors">
                Mark as Resolved
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
