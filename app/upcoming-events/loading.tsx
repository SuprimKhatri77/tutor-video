import { Card, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero  */}
        <div className="mb-16 max-w-3xl space-y-4  pt-10 md:pt-0">
          <div className="h-6 w-40 rounded bg-muted animate-pulse" />
          <div className="h-12 w-3/4 rounded bg-muted animate-pulse" />
          <div className="h-5 w-full rounded bg-muted animate-pulse" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card
              key={index}
              className="flex flex-col h-full border-muted/60"
            >
              <CardHeader className="space-y-4">
                <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                <div className="h-6 w-full rounded bg-muted animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-muted animate-pulse" />
              </CardHeader>

              <CardFooter className="mt-auto pt-6">
                <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
