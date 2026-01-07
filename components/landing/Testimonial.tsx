"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    initials: "RS",
    name: "Rajesh Sharma",
    level: "B2 Level Graduate",
    color: "bg-blue-200 text-blue-600",
    message:
      "The teaching method is excellent and very easy to understand. I passed my B2 exam on the first attempt thanks to the structured lessons and personalized attention.",
  },
  {
    initials: "SP",
    name: "Sita Poudel",
    level: "A2 Level Student",
    color: "bg-green-200 text-green-600",
    message:
      "Learning German seemed difficult at first, but the teacher made it so simple and fun. The classes are interactive and I'm making great progress!",
  },
  {
    initials: "AM",
    name: "Amit Mishra",
    level: "B1 Level Student",
    color: "bg-purple-200 text-purple-600",
    message:
      "Very supportive guidance and clear explanations. I feel confident speaking German now.",
  },
]

export const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-gray-600">Hear from my satisfied students</p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start" }}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((item, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full md:basis-1/2 shadow-md"
              >
                <div className=" p-6 rounded-xl shadow-md h-full">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 font-bold ${item.color}`}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.level}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    “{item.message}”
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

{/* carousel for mobile */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
  <CarouselPrevious className="relative inset-0 "/>
  <CarouselNext className="relative inset-0" />
</div>

          {/* Controls */}
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  )
}
