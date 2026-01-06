import {  Heart, MessageCircle, Users, BookOpen } from "lucide-react";

export const SocialStats = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-12 items-center">

     

          {/* Stats */}
            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-green-500 transition">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">350+</div>
              <div className="text-gray-400 text-sm">Nepali Students Learning German</div>
            </div>

            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500 transition">
              <BookOpen className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <div className="text-gray-400 text-sm">Lessons / Topics Taught</div>
            </div>

            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-pink-500 transition">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">1.2K</div>
              <div className="text-gray-400 text-sm">Satisfied Students</div>
            </div>

            <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-yellow-500 transition">
              <MessageCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-400 text-sm">Messages Answered</div>
            </div>
        </div>

       
      </div>
    </section>
  );
};
