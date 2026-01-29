import React from "react";

const About = () => {
  return (
    <section className="bg-white overflow-hidden">

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight">
            Healthcare, <br /> simplified for humans.
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-xl">
            Healio is built to remove friction from healthcare — helping patients
            connect with verified doctors, instantly and confidently.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100/40 rounded-3xl blur-2xl"></div>
          <img
            src="https://dratdoorstep.com/wp-content/uploads/2025/07/dr-at-door-website-home-page-dr-image-2.jpg"
            alt="Healthcare"
            className="relative z-10 w-full rounded-3xl shadow-xl"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 max-w-6xl mx-auto" />

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-10 text-gray-700 text-lg leading-relaxed">
        <p>
          Healthcare should feel calm, clear, and supportive — not confusing.
          But for too long, patients have struggled with outdated systems and slow processes.
        </p>
        <p>
          Healio changes that. We bring real-time availability, verified doctors,
          and instant booking together in one seamless experience.
        </p>
        <p>
          Whether you’re visiting a clinic or managing long-term care, Healio
          is designed to stay simple, reliable, and fast.
        </p>
      </div>

      <div className="bg-gray-50 border-t border-b">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Clarity</p>
            <p className="mt-3 text-lg font-medium text-gray-800">
              Clear steps. Clear choices.
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Trust</p>
            <p className="mt-3 text-lg font-medium text-gray-800">
              Verified professionals. Secure data.
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-widest">Speed</p>
            <p className="mt-3 text-lg font-medium text-gray-800">
              Appointments in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* CLOSING */}
      <div className="max-w-4xl mx-auto px-6 py-28 text-center">
        <p className="text-2xl font-medium text-gray-900">
          Built for patients. Designed for trust.
        </p>
        <p className="mt-4 text-lg text-gray-500">
          Healio is the future of accessible healthcare.
        </p>
      </div>

    </section>
  );
};

export default About;
