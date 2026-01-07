"use client"
import {  Heart, MessageCircle, Users, BookOpen } from "lucide-react";
import { AnimatedCounter } from "../AnimatedCounter";
import {motion} from "framer-motion"

export const Stats = () => {
  return (
    <section  className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-12 items-center">

          {/* Stats */}
            <motion.div viewport={{once: true}} initial={{opacity: 0}} whileInView={{opacity:1}} transition={{duration: 0.6, ease: "easeIn"}}
              
               className="bg-linear-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-green-500 transition">
              <Users className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter from={0} to={350} />+

              </div>
              <div className="text-gray-100 text-sm">Nepali Students Learning German</div>
            </motion.div>

            <motion.div viewport={{once: true}} initial={{opacity: 0}} whileInView={{opacity:1}} transition={{duration: 0.7, ease: "easeIn"}} className="bg-linear-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500 transition">
              <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">12</div>
              <div className="text-gray-100 text-sm">Lessons / Topics Taught</div>
            </motion.div>

            <motion.div viewport={{once: true}} initial={{opacity: 0}} whileInView={{opacity:1}} transition={{duration: 0.8, ease: "easeIn"}} className="bg-linear-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-pink-500 transition">
              <Heart className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter from={0} to={1200} animationOptions={{duration: 3}}/>
                
                +</div>
              <div className="text-gray-100 text-sm">Satisfied Students</div>
            </motion.div>

            <motion.div viewport={{once: true}} initial={{opacity: 0}} whileInView={{opacity:1}} transition={{duration: 0.9, ease: "easeIn"}} className="bg-linear-to-br from-blue-800 to-blue-900 rounded-2xl p-6 text-center border border-gray-700 hover:border-yellow-500 transition">
              <MessageCircle className="h-8 w-8 text-gray-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-100 text-sm">Messages Answered</div>
            </motion.div>
        </div>

       
      </div>
    </section>
  );
};
