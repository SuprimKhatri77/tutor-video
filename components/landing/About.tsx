import {
  BadgeCheck,
  CheckCircle,
  Award,
  Users,
  Clock,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

export const About = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Your German Language Guide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from an experienced educator dedicated to your success
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-[400px_1fr] gap-0">
            {/* Left - Profile Section */}
            <div className="bg-linear-to-br from-blue-50 via-blue-50 to-indigo-50 p-8 sm:p-12 flex flex-col items-center justify-center relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 rounded-full -ml-12 -mb-12 opacity-20"></div>

              <div className="relative z-10">
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl relative bg-linear-to-br from-gray-900 via-red-600 to-yellow-400">
                    <Image
                      src="/about-image.jpeg"
                      alt="Vikas - German Language Tutor"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover relative z-10"
                    />
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-3 shadow-lg ring-4 ring-white">
                    <BadgeCheck className="h-7 w-7 text-white" />
                  </div>
                </div>

                {/* Name and Title */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    Vikas Timalsina
                  </h3>
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                    <Award className="w-4 h-4" />
                    C1 Certified Tutor
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      10+
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Years Experience
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      500+
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      Students Taught
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content Section */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              {/* Introduction */}
              <div className="mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  Empowering Nepali Students to Master German
                </h4>
                <p className="text-gray-700 leading-relaxed text-base mb-4">
                  With over a decade of experience, I specialize in helping
                  Nepali students overcome the unique challenges of learning
                  German. My approach combines{" "}
                  <span className="font-semibold text-gray-900">
                    structured grammar training
                  </span>{" "}
                  with{" "}
                  <span className="font-semibold text-gray-900">
                    engaging cultural immersion
                  </span>
                  , making complex concepts accessible and enjoyable.
                </p>
                <p className="text-gray-700 leading-relaxed text-base">
                  I&apos;ve guided 500+ students from A1 to C1 levels, helping
                  them achieve their dreams of studying and working in Germany.
                  Whether you&apos;re preparing for exams or building
                  conversational fluency, I&apos;m here to support your journey
                  every step of the way.
                </p>
              </div>

              {/* Features Grid */}
              <div className="space-y-3">
                <h5 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                  What Sets Me Apart
                </h5>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        Certified Excellence
                      </div>
                      <div className="text-xs text-gray-600">
                        C1 Level Certification
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        Exam Specialist
                      </div>
                      <div className="text-xs text-gray-600">
                        Goethe & TestDaF Expert
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <div className="bg-purple-100 rounded-full p-1.5 mt-0.5">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        Flexible Schedule
                      </div>
                      <div className="text-xs text-gray-600">
                        Classes fit your routine
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <div className="bg-orange-100 rounded-full p-1.5 mt-0.5">
                      <Users className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        Small Batches
                      </div>
                      <div className="text-xs text-gray-600">
                        Personalized attention
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600 italic">
                  &quot;My mission is simple: to make your German learning
                  journey effective, enjoyable, and successful. Let&apos;s
                  achieve your goals together.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
