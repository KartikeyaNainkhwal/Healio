import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [payingId, setPayingId] = useState(null)

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const [day, month, year] = slotDate.split('_')
    return `${day} ${months[Number(month)]} ${year}`
  }

  //FETCH APPOINTMENTS 
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        { headers: { token } }
      )

      if (data.success) {
        setAppointments(data.appointments.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  //CANCEL APPOINTMENT
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // RAZORPAY INIT
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verifyRazorpay',
            { razorpay_order_id: response.razorpay_order_id },
            { headers: { token } }
          )

          if (data.success) {
            toast.success('Payment successful')
            setPayingId(null)
            getUserAppointments()
            navigate('/my-appointments')
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  //PAY APPOINTMENT 
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // LOAD DATA
  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>
        My appointments
      </p>

      {appointments.map((item) => (
        <div
          key={item._id}
          className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'
        >
          <div>
            <img
              className='w-36 bg-[#EAEFFF]'
              src={item.docData.image}
              alt=''
            />
          </div>

          <div className='flex-1 text-sm text-[#5E5E5E]'>
            <p className='text-[#262626] text-base font-semibold'>
              {item.docData.name}
            </p>
            <p>{item.docData.speciality}</p>

            <p className='text-[#464646] font-medium mt-1'>Address:</p>
            <p>{item.docData.address.line1}</p>
            <p>{item.docData.address.line2}</p>

            <p className='mt-1'>
              <span className='text-sm text-[#3C3C3C] font-medium'>
                Date & Time:
              </span>{' '}
              {slotDateFormat(item.slotDate)} | {item.slotTime}
            </p>
          </div>

          <div className='flex flex-col gap-2 justify-end text-sm text-center'>

            {!item.cancelled && !item.payment && !item.isCompleted && payingId !== item._id && (
              <button
                onClick={() => setPayingId(item._id)}
                className='sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white'
              >
                Pay Online
              </button>
            )}

            {!item.cancelled && !item.payment && !item.isCompleted && payingId === item._id && (
              <button
                onClick={() => appointmentRazorpay(item._id)}
                className='sm:min-w-48 py-2 border rounded flex justify-center'
              >
                <img
                  className='max-w-20 max-h-5'
                  src={assets.razorpay_logo}
                  alt=''
                />
              </button>
            )}

            {!item.cancelled && item.payment && !item.isCompleted && (
              <button className='sm:min-w-48 py-2 border rounded bg-[#EAEFFF]'>
                Paid
              </button>
            )}

            {item.isCompleted && (
              <button className='sm:min-w-48 py-2 border border-green-500 text-green-500 rounded'>
                Completed
              </button>
            )}

            {!item.cancelled && !item.isCompleted && (
              <button
                onClick={() => cancelAppointment(item._id)}
                className='sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white'
              >
                Cancel appointment
              </button>
            )}

            {item.cancelled && !item.isCompleted && (
              <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 rounded'>
                Appointment cancelled
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  )
}

export default MyAppointments
