"use client";
import { Heart, MessageCircle, Users, BookOpen, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  animationOptions?: {
    duration?: number;
  };
}

const AnimatedCounter = ({
  from,
  to,
  animationOptions = {},
}: AnimatedCounterProps) => {
  const [count, setCount] = useState<number>(from);
  const duration = animationOptions.duration || 2;

  useEffect(() => {
    let startTime: number | undefined;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(from + (to - from) * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration]);

  return <span>{count}</span>;
};

interface StatItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  accentColor: string;
}

export const Stats = () => {
  const stats: StatItem[] = [
    {
      icon: Users,
      value: 350,
      suffix: "+",
      label: "Nepali Students",
      sublabel: "Learning German",
      gradient: "from-blue-50 to-blue-100/50",
      iconBg: "bg-blue-500",
      iconColor: "text-white",
      accentColor: "border-blue-200",
    },
    {
      icon: BookOpen,
      value: 12,
      suffix: "",
      label: "Comprehensive Lessons",
      sublabel: "Expert-Crafted Topics",
      gradient: "from-slate-50 to-slate-100/50",
      iconBg: "bg-slate-700",
      iconColor: "text-white",
      accentColor: "border-slate-200",
    },
    {
      icon: Heart,
      value: 1200,
      suffix: "+",
      label: "Satisfied Students",
      sublabel: "Success Stories",
      gradient: "from-blue-50 to-indigo-50",
      iconBg: "bg-indigo-500",
      iconColor: "text-white",
      accentColor: "border-indigo-200",
    },
    {
      icon: MessageCircle,
      value: 500,
      suffix: "+",
      label: "Messages Answered",
      sublabel: "24/7 Support",
      gradient: "from-slate-50 to-blue-50",
      iconBg: "bg-blue-600",
      iconColor: "text-white",
      accentColor: "border-blue-200",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              Proven Results
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
            Join Our Growing{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-400">
              Community
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Empowering students to achieve their language learning goals
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div
                className={`
                relative h-full
                bg-linear-to-br ${stat.gradient}
                border-2 ${stat.accentColor}
                rounded-2xl sm:rounded-3xl
                p-6 sm:p-8
                transition-all duration-300
                hover:shadow-xl hover:shadow-blue-100/50
                hover:-translate-y-1
              `}
              >
                {/* Icon */}
                <div className="mb-5">
                  <div
                    className={`
                    inline-flex p-3 sm:p-3.5
                    ${stat.iconBg}
                    rounded-xl sm:rounded-2xl
                    ${stat.iconColor}
                    shadow-lg
                    transition-transform duration-300
                    group-hover:scale-110 group-hover:rotate-3
                  `}
                  >
                    <stat.icon
                      className="w-6 h-6 sm:w-7 sm:h-7"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>

                {/* Counter */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                      <AnimatedCounter
                        from={0}
                        to={stat.value}
                        animationOptions={{ duration: 2.5 }}
                      />
                    </span>
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-700">
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                {/* Label */}
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                    {stat.label}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">
                    {stat.sublabel}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute top-3 right-3 w-20 h-20 bg-white/40 rounded-full blur-2xl -z-10 group-hover:bg-white/60 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Live stats · Updated January 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
