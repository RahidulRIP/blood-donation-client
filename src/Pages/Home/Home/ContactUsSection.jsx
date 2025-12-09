import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"; // React Icons for contact info
import Container from "../../../Components/Container/Container"; // Assuming this provides max-width/padding

const ContactUsSection = () => {
  return (
    <div className=" bg-white">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Get In <span className="text-red-600">Touch</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            We are here to answer your questions about blood donation,
            partnerships, and support.
          </p>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 1. Contact Form */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h3>

            <form className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                  required
                />
              </div>

              {/* Subject Input */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="I have a question about..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* 2. Contact Information */}
          <div className="p-8 lg:p-12 bg-red-600 text-white rounded-xl shadow-lg flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold mb-8">
              Direct Contact Info
            </h3>

            <div className="space-y-8">
              {/* Phone Number */}
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="w-6 h-6 mt-1 shrink-0" />
                <div>
                  <p className="text-lg font-bold">Call Us</p>
                  <a href="tel:+1234567890" className="text-xl hover:underline">
                    +1 (234) 567-890
                  </a>
                  <p className="text-sm opacity-90">
                    Mon - Fri, 9:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="w-6 h-6 mt-1 shrink-0" />
                <div>
                  <p className="text-lg font-bold">Email Us</p>
                  <a
                    href="mailto:support@bloodlink.com"
                    className="text-xl hover:underline"
                  >
                    support@bloodlink.com
                  </a>
                  <p className="text-sm opacity-90">
                    We typically respond within 24 hours.
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="w-6 h-6 mt-1 shrink-0" />
                <div>
                  <p className="text-lg font-bold">Our Headquarters</p>
                  <p className="text-xl">123 Donor Avenue, Suite 400</p>
                  <p className="text-xl">Blood City, TX 77001</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactUsSection;
