import React from "react";

const Header = () => {
  return (
    <section className="relative bg-[#F8FAFC] overflow-hidden rounded-3xl px-6 md:px-16 py-24 md:mx-10 mt-10">
    <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-40 w-[420px] h-[420px] bg-indigo-100/50 rounded-full blur-3xl" />

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">

          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-full bg-blue-50 text-blue-600 font-medium">
            Healio • Modern Healthcare
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
            Healthcare that works <br /> around your life.
          </h1>

          <p className="text-gray-600 text-lg max-w-xl">
            Book appointments with verified doctors, see real-time availability,
            and manage your health — all in one simple platform.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-500">
              Trusted by <span className="font-semibold text-gray-800">12,000+</span> patients
            </p>
            <div className="h-4 w-px bg-gray-300"></div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">300+</span> doctors
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#speciality"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-medium shadow-lg"
            >
              Find a doctor
            </a>
            <button className="px-8 py-4 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-gray-700">
              How it works
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-3 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl"></div>
          <img
            src="https://www.prevea.com/getmedia/ed03e8ac-079a-4967-a802-a338cecb9e66/Primary-care-homepage-widget.jpg?width=700&height=525&ext=.jpg"
            alt="Healthcare dashboard"
            className="relative z-10 w-full rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Header;
