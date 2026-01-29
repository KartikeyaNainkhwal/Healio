import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'


const COLORS = ['#6366F1', '#22C55E', '#F59E0B']

const AppointmentsBarChart = ({ data }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h3 className="font-semibold text-gray-800 mb-4">
      Appointments Overview
    </h3>

    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

const SystemPieChart = ({ data }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h3 className="font-semibold text-gray-800 mb-4">
      System Distribution
    </h3>

    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>

    <div className="flex justify-center gap-4 mt-4 text-sm">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[i] }}
          />
          {item.name}
        </div>
      ))}
    </div>
  </div>
)


const Kpi = ({ title, value }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-semibold mt-2 text-gray-800">
      {value}
    </p>
  </div>
)

const ActivityStatus = ({ item }) => {
  if (item.cancelled)
    return <span className="text-xs text-red-500">Cancelled</span>
  if (item.isCompleted)
    return <span className="text-xs text-green-600">Completed</span>
  return <span className="text-xs text-blue-500">Pending</span>
}

const AppointmentRow = ({ item, slotDateFormat, cancelAppointment }) => (
  <div className="flex items-center gap-3 py-3">
    <img
      src={item.docData.image}
      alt=""
      className="w-8 h-8 rounded-full"
    />

    <div className="flex-1">
      <p className="text-sm font-medium">{item.docData.name}</p>
      <p className="text-xs text-gray-500">
        {slotDateFormat(item.slotDate)}
      </p>
    </div>

    {!item.isCompleted && !item.cancelled && cancelAppointment && (
      <button
        onClick={() => cancelAppointment(item._id)}
        className="text-xs text-red-500 hover:underline"
      >
        Cancel
      </button>
    )}
  </div>
)


const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getDashData()
  }, [aToken])

  if (!dashData) return null


  const appointmentStats = [
    {
      name: 'Pending',
      value: dashData.latestAppointments.filter(
        a => !a.isCompleted && !a.cancelled
      ).length,
    },
    {
      name: 'Completed',
      value: dashData.latestAppointments.filter(
        a => a.isCompleted
      ).length,
    },
    {
      name: 'Cancelled',
      value: dashData.latestAppointments.filter(
        a => a.cancelled
      ).length,
    },
  ]

  const systemStats = [
    { name: 'Doctors', value: dashData.doctors },
    { name: 'Patients', value: dashData.patients },
    { name: 'Appointments', value: dashData.appointments },
  ]

  const pending = dashData.latestAppointments.filter(
    a => !a.cancelled && !a.isCompleted
  )
  const completed = dashData.latestAppointments.filter(
    a => a.isCompleted
  )

  return (
    <div className="p-8 bg-[#F7F9FC] min-h-screen space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of your hospital activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Kpi title="Total Doctors" value={dashData.doctors} />
        <Kpi title="Appointments" value={dashData.appointments} />
        <Kpi title="Patients" value={dashData.patients} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentsBarChart data={appointmentStats} />
        <SystemPieChart data={systemStats} />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-lg mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {dashData.latestAppointments.slice(0, 4).map(item => (
            <div
              key={item._id}
              className="flex items-start gap-4 border-l-2 pl-4 border-indigo-500"
            >
              <img
                src={item.docData.image}
                alt=""
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  Appointment booked with{' '}
                  <span className="font-medium">
                    {item.docData.name}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {slotDateFormat(item.slotDate)}
                </p>
              </div>

              <ActivityStatus item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">
            Pending Appointments
          </h3>
          {pending.slice(0, 3).map(item => (
            <AppointmentRow
              key={item._id}
              item={item}
              slotDateFormat={slotDateFormat}
              cancelAppointment={cancelAppointment}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">
            Completed Appointments
          </h3>
          {completed.slice(0, 3).map(item => (
            <AppointmentRow
              key={item._id}
              item={item}
              slotDateFormat={slotDateFormat}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
