import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium text-blue-600">
            Specialities
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-900">
            Find the right doctor for your needs
          </h2>
          <p className="mt-4 text-gray-600 text-sm md:text-base">
            Browse by medical speciality and book appointments with verified
            professionals — fast, simple, and reliable.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              className="group relative p-6 rounded-2xl border border-gray-200 hover:border-blue-500 transition-all duration-300 bg-white hover:shadow-xl"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>

              <p className="relative text-lg font-medium text-gray-900 group-hover:text-blue-600 transition">
                {item.speciality}
              </p>

              <p className="relative mt-2 text-sm text-gray-500">
                View available doctors →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
