import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image')
      return
    }

    setDocImg(file)
  }

  const resetForm = () => {
    setDocImg(null)
    setName('')
    setEmail('')
    setPassword('')
    setExperience('1 Year')
    setFees('')
    setAbout('')
    setSpeciality('General physician')
    setDegree('')
    setAddress1('')
    setAddress2('')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!docImg) return toast.error('Doctor image is required')

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      )

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { atoken: aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        resetForm()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <form
      onSubmit={onSubmitHandler}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Doctor
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-8 max-w-5xl">
        <div className="flex items-center gap-6 mb-10">
          <label htmlFor="doc-img" className="relative cursor-pointer">
            <img
              src={
                docImg
                  ? URL.createObjectURL(docImg)
                  : assets.upload_area
              }
              alt=""
              className="w-20 h-20 rounded-full object-cover border-2 border-dashed border-gray-300"
            />
            <span className="absolute bottom-0 right-0 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
              Edit
            </span>
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={handleImageChange}
          />
          <p className="text-sm text-gray-500">
            Upload doctor profile picture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-600">
          <div className="space-y-4">
            <Input label="Doctor Name" value={name} setValue={setName} />
            <Input label="Email" type="email" value={email} setValue={setEmail} />
            <Input
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
            />

            <Select
              label="Experience"
              value={experience}
              setValue={setExperience}
              options={[
                '1 Year',
                '2 Years',
                '3 Years',
                '4 Years',
                '5 Years',
                '6 Years',
                '8 Years',
                '9 Years',
                '10+ Years',
              ]}
            />

            <Input
              label="Consultation Fees"
              type="number"
              value={fees}
              setValue={setFees}
            />
          </div>

          <div className="space-y-4">
            <Select
              label="Speciality"
              value={speciality}
              setValue={setSpeciality}
              options={[
                'General physician',
                'Gynecologist',
                'Dermatologist',
                'Pediatricians',
                'Neurologist',
                'Gastroenterologist',
              ]}
            />

            <Input label="Degree" value={degree} setValue={setDegree} />

            <div className="space-y-2">
              <p>Address</p>
              <input
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Address line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
              <input
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Address line 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2">About Doctor</p>
          <textarea
            rows={5}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none resize-none"
            placeholder="Write a short description about the doctor"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-8 px-12 py-3 rounded-xl text-white font-medium transition
            ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary hover:shadow-lg active:scale-95'
            }`}
        >
          {loading ? 'Adding Doctor...' : 'Add Doctor'}
        </button>
      </div>
    </form>
  )
}


const Input = ({ label, value, setValue, type = 'text' }) => (
  <div className="flex flex-col gap-1">
    <p>{label}</p>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
      required
    />
  </div>
)

const Select = ({ label, value, setValue, options }) => (
  <div className="flex flex-col gap-1">
    <p>{label}</p>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)

export default AddDoctor
