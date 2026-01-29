import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import EditDoctorModal from "./EditDoctorModal";
import ViewDoctorModal from "./ViewDoctorModal";

const DoctorsList = () => {
  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability,
    updateDoctorProfile,
  } = useContext(AdminContext);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="p-8 bg-[#F7F9FC] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Doctors
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage doctor profiles and availability
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition"
          >
            <div className="bg-gray-100 flex justify-center items-center p-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>

            <div className="p-5 space-y-3">
              <div>
                <p className="text-gray-900 font-medium text-lg">
                  {doctor.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {doctor.speciality}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-600">
                  Availability
                </span>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setViewDoctor(doctor)}
                  className="flex-1 text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  View Profile
                </button>

                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="flex-1 text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewDoctor && (
        <ViewDoctorModal
          doctor={viewDoctor}
          onClose={() => setViewDoctor(null)}
        />
      )}

      {selectedDoctor && (
        <EditDoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSave={updateDoctorProfile}
        />
      )}
    </div>
  );
};

export default DoctorsList;
