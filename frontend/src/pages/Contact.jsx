import React from 'react'

const Contact = () => {
  return (
    <div className="px-6 md:px-10 py-16 bg-gray-50 ">
      
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          We’re here to help you. Reach out to us for support, queries, or career opportunities.
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border grid md:grid-cols-2 gap-10 p-8 md:p-12">

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Our Office</h2>
            <p className="text-gray-500 leading-relaxed">
              54 South Delhi <br />
              New Delhi, India
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact Info</h2>
            <p className="text-gray-500 leading-relaxed">
              Phone: (91) 90000000 <br />
              Email: customersupport@healio.in
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Careers at </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Join our team and help us build products that make healthcare simpler and better.
            </p>
          </div>

          <button className="self-start px-8 py-3 border border-gray-800 rounded-lg text-sm font-medium
            hover:bg-gray-900 hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>

      </div>
    </div>
  )
}

export default Contact
