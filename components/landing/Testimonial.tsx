export const Testimonial = () => {
    return (
         <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Success Stories</h2>
            <p className="text-gray-600">Hear from my satisfied students</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-lg">RS</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Rajesh Sharma</p>
                  <p className="text-sm text-gray-600">B2 Level Graduate</p>
                </div>
              </div>
              <p className="text-gray-600 italic">The teaching method is excellent and very easy to understand. I passed my B2 exam on the first attempt thanks to the structured lessons and personalized attention.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold text-lg">SP</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sita Poudel</p>
                  <p className="text-sm text-gray-600">A2 Level Student</p>
                </div>
              </div>
              <p className="text-gray-600 italic">Learning German seemed difficult at first, but the teacher made it so simple and fun. The classes are interactive and I&apos;m making great progress!</p>
            </div>
          </div>
        </div>
      </section>

     

    )
}