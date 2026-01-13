"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GraduationCap, PlayCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6 lg:p-8 py-10 lg:py-20 ">
      <div className="w-full max-w-4xl">
        {/* 404 Number with gradient effect */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none">
            <span className="bg-linear-to-br from-black via-gray-700 to-gray-400 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <div className="h-1 w-24 sm:w-32 bg-black mx-auto mt-4 sm:mt-6"></div>
        </div>

        {/* Main Card */}
        <Card className="border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1">
          <CardHeader className="space-y-3 sm:space-y-4 text-center px-4 sm:px-6 pt-8 sm:pt-10 pb-4">
            <div className="flex justify-center mb-2">
              <div className="p-3 sm:p-4 bg-black rounded-full">
                <GraduationCap
                  className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              This page doesn&apos;t speak German yet
              <span className="ml-2 inline-block animate-bounce">🇩🇪</span>
            </CardTitle>

            <CardDescription className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              Looks like you&apos;ve taken a wrong turn—but learning never
              stops.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10">
            {/* Feature Section */}
            <div className="bg-gray-50 border-2 border-black p-6 sm:p-8 space-y-4">
              <p className="text-lg sm:text-xl font-semibold text-black">
                Start mastering German with:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-xl sm:text-2xl mt-1">→</span>
                  <span className="text-base sm:text-lg leading-relaxed">
                    <strong className="font-bold text-black">Simple</strong>{" "}
                    explanations that make sense
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl sm:text-2xl mt-1">→</span>
                  <span className="text-base sm:text-lg leading-relaxed">
                    <strong className="font-bold text-black">Clear</strong>{" "}
                    video lessons you can follow
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl sm:text-2xl mt-1">→</span>
                  <span className="text-base sm:text-lg leading-relaxed">
                    <strong className="font-bold text-black">Practical</strong>{" "}
                    skills for real conversations
                  </span>
                </li>
              </ul>
            </div>

            {/* Quote Section */}
            <blockquote className="border-l-4 border-black pl-4 sm:pl-6 py-2 italic text-base sm:text-lg text-gray-700">
              &quot;Every mistake is a step closer to fluency. Let&apos;s learn
              German the right way—one video at a time.&quot;
            </blockquote>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link href="/videos" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold text-base sm:text-lg h-12 sm:h-14 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group"
                >
                  <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Videos & Learn
                </Button>
              </Link>

              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-black hover:bg-black hover:text-white font-bold text-base sm:text-lg h-12 sm:h-14 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all group"
                >
                  Go Home
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Bottom text */}
        <p className="text-center mt-6 sm:mt-8 text-sm sm:text-base text-gray-500 font-medium">
          Lost? That&apos;s okay. The best lessons often come from unexpected
          detours.
        </p>
      </div>
    </div>
  );
}
