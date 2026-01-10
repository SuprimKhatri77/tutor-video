"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { GraduationCap, PlayCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-xl text-center shadow-xl">
        <CardHeader className="space-y-3">
          <div className="flex justify-center">
            <GraduationCap size={56} className="text-blue-600" />
          </div>

          <CardTitle className="text-5xl font-bold text-gray-900">
            404
          </CardTitle>

          <CardDescription className="text-xl font-semibold text-gray-700">
            This page doesn’t speak German yet 🇩🇪
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <p className="text-base text-gray-600">
            Looks like you’ve taken a wrong turn but learning never stops.
            Start mastering German with simple, clear, and practical video lessons.
          </p>

          <p className="text-sm text-gray-500">
            Every mistake is a step closer to fluency.  
            Let’s learn German the right way  one video at a time.
          </p>

          <div className="pt-4 flex justify-center">
            <Link href="/videos">
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 font-semibold flex items-center gap-2"
              >
                <PlayCircle size={20} />
                Watch Videos & Learn German
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
