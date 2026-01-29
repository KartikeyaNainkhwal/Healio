import React, { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const DoctorSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-sm">
      <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-3 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

const SPECIALITIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(false)
  const [search, setSearch] = useState('')

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchSpeciality = speciality ? doc.speciality === speciality : true
      const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase())
      return matchSpeciality && matchSearch
    })
  }, [doctors, speciality, search])

  const handleFilterClick = (spec) => {
    navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)
    setShowFilter(false)
  }

  const isLoading = doctors.length === 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Find Your Doctor</h2>
      <p className="text-gray-500 mt-1">
        Search and book appointments with top specialists
      </p>

      <input
        type="text"
        placeholder="Search doctor by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 w-full sm:w-96 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
      />

      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        <button
          onClick={() => setShowFilter(prev => !prev)}
          className="sm:hidden border px-4 py-2 rounded-lg text-sm"
        >
          Filters
        </button>

        <div className={`flex sm:flex-col gap-2 flex-wrap ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {SPECIALITIES.map(spec => (
            <button
              key={spec}
              onClick={() => handleFilterClick(spec)}
              className={`px-4 py-2 rounded-full text-sm border transition
                ${speciality === spec
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-600 hover:bg-gray-100'}
              `}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <DoctorSkeleton key={i} />)
            : filteredDoctors.map(doc => (
                <div
                  key={doc._id}
                  onClick={() => {
                    navigate(`/appointment/${doc._id}`)
                    window.scrollTo(0, 0)
                  }}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-48 w-full object-cover rounded-t-2xl bg-[#EAEFFF]"
                  />

                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          doc.available ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      <span className={doc.available ? 'text-green-600' : 'text-gray-500'}>
                        {doc.available ? 'Available' : 'Not Available'}
                      </span>
                    </div>

                    <h3 className="mt-2 text-lg font-semibold text-gray-800">
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-500">{doc.speciality}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
