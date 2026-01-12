"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";

export default function EventDetailPage() {
  const mockEvent = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Annual Tech Conference 2024",
    body: "Join us for the biggest tech conference of the year! Network with industry leaders, attend workshops, and discover the latest innovations in technology. This event features keynote speakers from top companies, hands-on demos, and interactive sessions covering AI, blockchain, cloud computing, and more.",
    eventDate: new Date("2024-12-15T14:00:00"),
    createdAt: new Date("2024-01-10T10:30:00"),
    updatedAt: new Date("2024-01-12T15:45:00"),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(mockEvent.title);
  const [body, setBody] = useState(mockEvent.body);
  const [eventDate, setEventDate] = useState(
    mockEvent.eventDate ? mockEvent.eventDate.toISOString().slice(0, 16) : ""
  );

  const formatDate = (date: Date) => {
    if (!date) return "Date TBA";
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatTimestamp = (date: Date) => {
    if (!date) return "N/A";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const handleSave = () => {
    console.log("Saving:", { title, body, eventDate });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(mockEvent.title);
    setBody(mockEvent.body);
    setEventDate(
      mockEvent.eventDate ? mockEvent.eventDate.toISOString().slice(0, 16) : ""
    );
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/admin/events"
          className="inline-flex items-center text-black font-bold mb-8 hover:underline"
        >
          ← Back to Events
        </Link>

        {/* Event Card */}
        <div className="border-2 border-black p-8">
          {isEditing ? (
            <div className="space-y-6">
              {/* Edit Event Date */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Event Date
                </label>
                <Input
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="border-2 border-black focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Edit Title */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-black text-xl font-bold focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Edit Body */}
              <div>
                <label className="block text-sm font-bold text-black mb-2">
                  Description
                </label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={8}
                  className="border-2 border-black text-lg focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Save/Cancel Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="bg-black text-white px-6 py-2 font-bold hover:bg-gray-800 border-2 border-black"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-white text-black px-6 py-2 font-bold border-2 border-black hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* Event Date Badge */}
              {mockEvent.eventDate && (
                <div className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
                  {formatDate(mockEvent.eventDate)}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl font-bold text-black mb-4">{title}</h1>

              {/* Body */}
              <p className="text-gray-800 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                {body}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <span className="font-semibold text-black">Created:</span>{" "}
                  {formatTimestamp(mockEvent.createdAt)}
                </div>
                {mockEvent.updatedAt && (
                  <div>
                    <span className="font-semibold text-black">Updated:</span>{" "}
                    {formatTimestamp(mockEvent.updatedAt)}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-black text-white px-6 py-2 font-bold hover:bg-gray-800 border-2 border-black"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-black px-6 py-2 font-bold border-2 border-black hover:bg-black hover:text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
