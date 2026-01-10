import { BadgeCheck, CheckCircle } from "lucide-react";
import Image from "next/image";

export const About = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-gray-50 to-blue-50 rounded-3xl p-4 sm:p-8 md:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Profile Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-60 sm:w-72 h-60 sm:h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl relative">
                  <div className="absolute inset-0 bg-linear-to-b from-black via-red-600 to-yellow-400"></div>
                  {/* NOTE:  replace with image provided by vikas dai */}
                  {/* <Image
                    src="https://p19-common-sign-useastred.tiktokcdn-eu.com/tos-useast2a-avt-0068-euttp/5d7431fe4cbc45dadde899954e434e7f~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=b45fa506&x-expires=1767873600&x-signature=oVZ6D6oiYbCt95JRVFS7mn%2BckCw%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my"
                    alt="German Tutor"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover relative z-10"
                  /> */}
                </div>
                {/* Verified Badge */}
                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 shadow-lg">
                  <BadgeCheck className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  Hello! I&apos;m  Vikas
                </h2>
                <p className="text-blue-600 font-semibold sm:text-lg">
                  C1 Certified German Tutor
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                With over 7 years of experience teaching German to Nepali
                students, I understand the specific challenges you face when
                learning this complex language. My teaching methodology blends
                rigorous grammar training with fun, interactive cultural
                immersion. I have helped over 500 students achieve their dream
                of studying and working in Germany.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Certified Trainer
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Exam Specialist
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Flexible Timings
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 font-medium">
                    Small Batches
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
