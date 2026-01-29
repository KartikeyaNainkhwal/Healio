import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden my-24 md:mx-10 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#2563EB] px-6 sm:px-10 md:px-16 py-16 md:py-20 text-center">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
        Book appointments with trusted doctors
      </h2>

      <p className="mt-4 text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
        Healio helps patients discover verified doctors and manage appointments
        effortlessly with a clean, reliable, and modern healthcare experience.
      </p>

      <button
        onClick={() => {
          navigate("/login");
          scrollTo(0, 0);
        }}
        className="mt-8 inline-flex items-center justify-center bg-white text-[#1E3A8A] px-10 py-3 rounded-full font-medium hover:scale-105 transition"
      >
        Create free account
      </button>
    </div>
  );
};

export default Banner;
