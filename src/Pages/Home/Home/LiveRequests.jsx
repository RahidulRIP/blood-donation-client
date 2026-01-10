import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import Container from "../../../Components/Container/Container";
import { FaArrowRight } from "react-icons/fa6";

const LiveRequests = () => {
  const axiosPublic = useAxios();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/create-donation-request");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="fixed-spacing text-center bg-base-200">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600 mx-auto"></div>
        <p className="mt-4 text-slate-500 font-black uppercase tracking-widest text-xs">
          Syncing Live Requests...
        </p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-base-200 transition-colors duration-700 relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-[30%] h-[40%] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div>
            <span className="text-red-600 font-black uppercase tracking-[0.3em] md:text-xs">
              Urgent Needs
            </span>
            <h2 className="text-4xl md:text-5xl font-black  tracking-tighter mt-2">
              LIVE <span className="text-red-600 uppercase">Requests</span>
            </h2>
          </div>

          <Link
            to="/donation-request-public"
            className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-all"
          >
            View All Requests
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Card Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {requests.slice(0, 4).map((request, index) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Make the entire card a Link */}
              <Link to={`dashboard/detailsDonarReqData/${request._id}`}>
                <div className="relative bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-red-500/10 group-hover:-translate-y-2 overflow-hidden">
                  {/* Visual Accent: Left Color Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-100 group-hover:bg-red-600 transition-colors duration-500" />

                  {/* Top Section: Blood Group & Live Status */}
                  <div className="flex justify-between items-start mb-8 pl-2">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-lg group-hover:bg-red-600 group-hover:rotate-6 transition-all duration-500">
                      <span className="text-2xl font-black italic leading-none">
                        {request.recipient_blood_group}
                      </span>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                        </span>
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                          Live
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Recipient Identity */}
                  <div className="mb-8 pl-2">
                    <h3 className="text-xl font-black text-slate-950 leading-tight mb-2 group-hover:text-red-600 transition-colors">
                      {request.recipient_name}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-red-500" />
                      {request.hospital_name}
                    </p>
                  </div>

                  {/* Bottom Section: Clean Info Grid */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-6 pl-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-tighter">
                        Location
                      </span>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500 text-[10px]" />
                        <span className="text-xs font-black text-slate-700 truncate">
                          {request.recipient_district}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-tighter">
                        Deadline
                      </span>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-blue-500 text-[10px]" />
                        <span className="text-xs font-black text-slate-700">
                          {request.donation_date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle "Arrow" Indicator appears only on hover to guide the user */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                    <FaArrowRight size={14} className="text-red-600" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LiveRequests;
