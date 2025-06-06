import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Code,
  Trophy,
  Users,
  BookOpen,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Star,
  CheckCircle,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const AboutUs = () => {
  // Mock authentication state for demo
  const { isCheckingAuth, authUser } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigator = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    if (isCheckingAuth && authUser) {
      navigator("/home");
    } else {
      // Navigate to login page
      navigator("/login");
    }
  };

  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Premium Problems",
      description: "Curated DSA problems from top tech companies",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Interview Ready",
      description: "Master patterns used in FAANG interviews",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Learn with thousands of fellow programmers",
      color: "from-orange-500 to-red-500",
    },
  ];

  const benefits = [
    "Solve 1000+ handpicked problems",
    "Learn from detailed explanations",
    "Practice with real interview questions",
    "Track your coding journey",
    "Join a thriving community",
    "Get hired at top companies",
  ];

  const stats = [
    { number: "50K+", label: "Active Coders" },
    { number: "1M+", label: "Problems Solved" },
    { number: "95%", label: "Interview Success" },
    { number: "500+", label: "Companies Trust Us" },
  ];

  return (
    // <div className="min-h-screen w-full bg-gradient-to-br from-base-100 via-base-200 to-base-300">
    //   {/* Navigation */}
    //   <nav className="relative z-50 w-full px-6 py-4 bg-base-200/80 backdrop-blur-xl border-b border-base-300/50">
    //     <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
    //       <div className="flex items-center space-x-3">
    //         <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
    //           <Code className="w-6 h-6 text-primary-content" />
    //         </div>
    //         <span className="text-2xl font-bold text-base-content">
    //           Questions-lab
    //         </span>
    //       </div>
    //       <button
    //         onClick={handleStart}
    //         className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-full font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-primary/25"
    //       >
    //         Get Started
    //       </button>
    //     </div>
    //   </nav>

    //   {/* Hero Section */}
    //   <section className="relative px-6 py-20 overflow-hidden">
    //     <div className="max-w-7xl mx-auto text-center relative z-10">
    //       <div
    //         className={`transition-all duration-1000 ${
    //           isVisible
    //             ? "opacity-100 translate-y-0"
    //             : "opacity-0 translate-y-10"
    //         }`}
    //       >
    //         <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 mb-8 border border-white/20">
    //           <Star className="w-4 h-4 mr-2 text-yellow-400" />
    //           Trusted by 50,000+ developers worldwide
    //         </div>

    //         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
    //           Master{" "}
    //           <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
    //             DSA
    //           </span>
    //           <br />
    //           Ace Your{" "}
    //           <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
    //             Interviews
    //           </span>
    //         </h1>

    //         <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
    //           Join thousands of programmers who've transformed their careers
    //           with our comprehensive Data Structures & Algorithms platform. From
    //           beginner to expert, we've got you covered.
    //         </p>

    //         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    //           <button
    //             onClick={handleStart}
    //             className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 flex items-center"
    //           >
    //             Start Your Journey
    //             <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
    //           </button>
    //           <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
    //             Watch Demo
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Floating Elements */}
    //     <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
    //     <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
    //   </section>

    //   {/* Stats Section */}
    //   <section className="px-6 py-16 bg-black/20 backdrop-blur-sm">
    //     <div className="max-w-6xl mx-auto">
    //       <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    //         {stats.map((stat, index) => (
    //           <div key={index} className="text-center group">
    //             <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
    //               {stat.number}
    //             </div>
    //             <div className="text-gray-300 font-medium">{stat.label}</div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Features Section */}
    //   <section className="px-6 py-20">
    //     <div className="max-w-7xl mx-auto">
    //       <div className="text-center mb-16">
    //         <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
    //           Why Choose{" "}
    //           <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
    //             Questions-lab?
    //           </span>
    //         </h2>
    //         <p className="text-xl text-gray-300 max-w-3xl mx-auto">
    //           We've designed the perfect platform to accelerate your coding
    //           journey and land your dream job
    //         </p>
    //       </div>

    //       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         {features.map((feature, index) => (
    //           <div
    //             key={index}
    //             className={`group p-8 rounded-3xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
    //               activeFeature === index
    //                 ? "bg-white/10 scale-105 -translate-y-2"
    //                 : "bg-white/5"
    //             }`}
    //           >
    //             <div
    //               className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
    //             >
    //               {feature.icon}
    //             </div>
    //             <h3 className="text-2xl font-bold text-white mb-4">
    //               {feature.title}
    //             </h3>
    //             <p className="text-gray-300 leading-relaxed">
    //               {feature.description}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Benefits Section */}
    //   <section className="px-6 py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
    //     <div className="max-w-6xl mx-auto">
    //       <div className="grid lg:grid-cols-2 gap-16 items-center">
    //         <div>
    //           <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
    //             Transform Your{" "}
    //             <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
    //               Career
    //             </span>
    //           </h2>
    //           <p className="text-xl text-gray-300 mb-10 leading-relaxed">
    //             From junior developer to senior engineer, our structured
    //             approach helps you master the skills that matter most in
    //             technical interviews.
    //           </p>

    //           <div className="space-y-4">
    //             {benefits.map((benefit, index) => (
    //               <div key={index} className="flex items-center group">
    //                 <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
    //                   <CheckCircle className="w-4 h-4 text-white" />
    //                 </div>
    //                 <span className="text-gray-300 text-lg group-hover:text-white transition-colors duration-200">
    //                   {benefit}
    //                 </span>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         <div className="relative">
    //           <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
    //             <div className="space-y-6">
    //               <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
    //                 <span className="text-gray-300">Problems Solved</span>
    //                 <span className="text-2xl font-bold text-green-400">
    //                   247
    //                 </span>
    //               </div>
    //               <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
    //                 <span className="text-gray-300">Current Streak</span>
    //                 <span className="text-2xl font-bold text-orange-400">
    //                   15 days
    //                 </span>
    //               </div>
    //               <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
    //                 <span className="text-gray-300">Success Rate</span>
    //                 <span className="text-2xl font-bold text-blue-400">
    //                   94%
    //                 </span>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
    //             <Trophy className="w-10 h-10 text-white" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* CTA Section */}
    //   <section className="px-6 py-20">
    //     <div className="max-w-4xl mx-auto text-center">
    //       <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
    //         <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
    //         <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
    //           Ready to Level Up?
    //         </h2>
    //         <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
    //           Join the ranks of successful developers who've mastered DSA and
    //           landed their dream jobs. Your coding journey starts here.
    //         </p>
    //         <button
    //           onClick={handleStart}
    //           className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 flex items-center mx-auto"
    //         >
    //           Start Coding Now
    //           <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
    //         </button>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Footer */}
    //   <footer className="px-6 py-16 bg-black/40 backdrop-blur-sm border-t border-white/10">
    //     <div className="max-w-6xl mx-auto">
    //       <div className="grid md:grid-cols-4 gap-12">
    //         {/* Logo and Description */}
    //         <div className="md:col-span-2">
    //           <div className="flex items-center space-x-3 mb-6">
    //             <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
    //               <Code className="w-6 h-6 text-white" />
    //             </div>
    //             <span className="text-2xl font-bold text-white">
    //               Questions-lab
    //             </span>
    //           </div>
    //           <p className="text-gray-300 leading-relaxed max-w-md">
    //             Empowering developers worldwide to master Data Structures &
    //             Algorithms and excel in their technical interviews.
    //           </p>
    //         </div>

    //         {/* Quick Links */}
    //         <div>
    //           <h3 className="text-lg font-semibold text-white mb-4">
    //             Quick Links
    //           </h3>
    //           <div className="space-y-3">
    //             {["Home", "Problems", "Learn", "Discuss", "Contest"].map(
    //               (link) => (
    //                 <div key={link}>
    //                   <a
    //                     href="#"
    //                     className="text-gray-300 hover:text-white transition-colors duration-200"
    //                   >
    //                     {link}
    //                   </a>
    //                 </div>
    //               )
    //             )}
    //           </div>
    //         </div>

    //         {/* Social Media */}
    //         <div>
    //           <h3 className="text-lg font-semibold text-white mb-4">
    //             Connect With Us
    //           </h3>
    //           <div className="flex space-x-4">
    //             <a
    //               href="#"
    //               className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
    //             >
    //               <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white" />
    //             </a>
    //             <a
    //               href="#"
    //               className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 group"
    //             >
    //               <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
    //             </a>
    //             <a
    //               href="#"
    //               className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 group"
    //             >
    //               <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white" />
    //             </a>
    //             <a
    //               href="#"
    //               className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 group"
    //             >
    //               <Mail className="w-5 h-5 text-gray-300 group-hover:text-white" />
    //             </a>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="border-t border-white/10 mt-12 pt-8 text-center">
    //         <p className="text-gray-400">
    //           © 2025 Questions-lab. All rights reserved. Built with ❤️ for
    //           developers worldwide.
    //         </p>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <div className="min-h-screen w-full bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      <nav className="relative z-50 w-full px-4 py-3 bg-base-200/80 backdrop-blur-xl border-b border-base-300/50">
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-content" />
            </div>
            <span className="text-xl font-bold text-base-content">
              Questions-lab
            </span>
          </div>
          <button
            onClick={handleStart}
            className="px-5 py-1.5 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-full font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-primary/25 text-sm"
            // Reduced px, py, added text-sm
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-16 overflow-hidden">
        {/* Reduced px and py */}
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Reduced max-w-7xl to max-w-6xl */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              {/* Reduced text-5xl to text-4xl, md:text-7xl to md:text-6xl, mb-6 to mb-5 */}
              Master{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DSA
              </span>
              <br />
              Ace Your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Interviews
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {/* Reduced text-xl to text-lg, mb-12 to mb-10, max-w-3xl to max-w-2xl */}
              Join thousands of programmers who've transformed their careers
              with our comprehensive Data Structures & Algorithms platform. From
              beginner to expert, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              {/* Reduced gap-4 to gap-3 */}
              <button
                onClick={handleStart}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-base hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 flex items-center"
                // Reduced px, py, rounded, text-lg to text-base
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                {/* Reduced w, h, ml */}
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements - Adjusted size and position slightly */}
        <div className="absolute top-16 left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        {/* Reduced top, left, w, h */}
        <div className="absolute bottom-16 right-8 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        {/* Reduced bottom, right, w, h */}
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 bg-black/20 backdrop-blur-sm">
        {/* Reduced px, py */}
        <div className="max-w-5xl mx-auto">
          {/* Reduced max-w-6xl to max-w-5xl */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Reduced gap-8 to gap-6 */}
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1.5 group-hover:scale-110 transition-transform duration-300">
                  {/* Reduced text-4xl to text-3xl, md:text-5xl to md:text-4xl, mb-2 to mb-1.5 */}
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm font-medium">
                  {/* Added text-sm */}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        {/* Reduced px, py */}
        <div className="max-w-6xl mx-auto">
          {/* Reduced max-w-7xl to max-w-6xl */}
          <div className="text-center mb-12">
            {/* Reduced mb-16 to mb-12 */}
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              {/* Reduced text-4xl to text-3xl, md:text-5xl to md:text-4xl, mb-6 to mb-5 */}
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Questions-lab?
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {/* Reduced text-xl to text-lg, max-w-3xl to max-w-2xl */}
              We've designed the perfect platform to accelerate your coding
              journey and land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reduced gap-8 to gap-6 */}
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-1.5 ${
                  // Reduced p, rounded, hover:-translate-y
                  activeFeature === index
                    ? "bg-white/10 scale-105 -translate-y-1.5"
                    : "bg-white/5"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  // Reduced w, h, rounded, mb
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {/* Reduced text-2xl to text-xl, mb-4 to mb-3 */}
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {/* Added text-sm */}
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        {/* Reduced px, py */}
        <div className="max-w-5xl mx-auto">
          {/* Reduced max-w-6xl to max-w-5xl */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Reduced gap-16 to gap-12 */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {/* Reduced text-4xl to text-3xl, md:text-5xl to md:text-4xl, mb-8 to mb-6 */}
                Transform Your{" "}
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Career
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {/* Reduced text-xl to text-lg, mb-10 to mb-8 */}
                From junior developer to senior engineer, our structured
                approach helps you master the skills that matter most in
                technical interviews.
              </p>

              <div className="space-y-3">
                {/* Reduced space-y-4 to space-y-3 */}
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      {/* Reduced w, h, mr */}
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                      {/* Reduced w, h */}
                    </div>
                    <span className="text-gray-300 text-base group-hover:text-white transition-colors duration-200">
                      {/* Reduced text-lg to text-base */}
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                {/* Reduced rounded, p */}
                <div className="space-y-4">
                  {/* Reduced space-y-6 to space-y-4 */}
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    {/* Reduced p, rounded */}
                    <span className="text-gray-300 text-sm">
                      {/* Added text-sm */}
                      Problems Solved
                    </span>
                    <span className="text-xl font-bold text-green-400">
                      {/* Reduced text-2xl to text-xl */}
                      247
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    {/* Reduced p, rounded */}
                    <span className="text-gray-300 text-sm">
                      {/* Added text-sm */}
                      Current Streak
                    </span>
                    <span className="text-xl font-bold text-orange-400">
                      {/* Reduced text-2xl to text-xl */}
                      15 days
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    {/* Reduced p, rounded */}
                    <span className="text-gray-300 text-sm">
                      {/* Added text-sm */}
                      Success Rate
                    </span>
                    <span className="text-xl font-bold text-blue-400">
                      {/* Reduced text-2xl to text-xl */}
                      94%
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                {/* Reduced top, right, w, h */}
                <Trophy className="w-8 h-8 text-white" />
                {/* Reduced w, h */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-black/40 backdrop-blur-sm border-t border-white/10">
        {/* Reduced px, py */}
        <div className="max-w-5xl mx-auto">
          {/* Reduced max-w-6xl to max-w-5xl */}
          <div className="grid md:grid-cols-4 gap-8">
            {/* Reduced gap-12 to gap-8 */}
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2.5 mb-5">
                {/* Reduced space-x, mb */}
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  {/* Reduced w, h, rounded */}
                  <Code className="w-5 h-5 text-white" />
                  {/* Reduced w, h */}
                </div>
                <span className="text-xl font-bold text-white">
                  {/* Reduced text-2xl to text-xl */}
                  Questions-lab
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                {/* Added text-sm */}
                Empowering developers worldwide to master Data Structures &
                Algorithms and excel in their technical interviews.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base font-semibold text-white mb-3">
                {/* Reduced text-lg to text-base, mb-4 to mb-3 */}
                Quick Links
              </h3>
              <div className="space-y-2.5">
                {/* Reduced space-y-3 to space-y-2.5 */}
                {["Home", "Problems", "Learn", "Discuss", "Contest"].map(
                  (link) => (
                    <div key={link}>
                      <a
                        href="#"
                        className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                        // Added text-sm
                      >
                        {link}
                      </a>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-base font-semibold text-white mb-3">
                {/* Reduced text-lg to text-base, mb-4 to mb-3 */}
                Connect With Us
              </h3>
              <div className="flex space-x-3">
                {/* Reduced space-x-4 to space-x-3 */}
                <a
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 group"
                  // Reduced w, h
                >
                  <Twitter className="w-4.5 h-4.5 text-gray-300 group-hover:text-white" />
                  {/* Reduced w, h */}
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 group"
                  // Reduced w, h
                >
                  <Github className="w-4.5 h-4.5 text-gray-300 group-hover:text-white" />
                  {/* Reduced w, h */}
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300 group"
                  // Reduced w, h
                >
                  <Linkedin className="w-4.5 h-4.5 text-gray-300 group-hover:text-white" />
                  {/* Reduced w, h */}
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 group"
                  // Reduced w, h
                >
                  <Mail className="w-4.5 h-4.5 text-gray-300 group-hover:text-white" />
                  {/* Reduced w, h */}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-center">
            {/* Reduced mt, pt */}
            <p className="text-gray-400 text-sm">
              {/* Added text-sm */}© 2025 Questions-lab. All rights reserved.
              Built with ❤️ for developers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
