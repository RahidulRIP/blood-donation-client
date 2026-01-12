import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonateBloodCard from "./DonateBloodCard/DonateBloodCard";
import { useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaTint,
  FaShieldAlt,
  FaWaveSquare,
} from "react-icons/fa";
import Container from "../../../Components/Container/Container";
import { useState, useMemo } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Shared/Loader";
import { motion, AnimatePresence } from "framer-motion";

const DonateBlood = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bloodSort, setBloodSort] = useState("all");

  const {
    data: donationReqALLData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donationReqALLData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
    enabled: !!user?.email && !!user?.accessToken,
  });

  const filteredAndSortedData = useMemo(() => {
    let result = [...donationReqALLData];
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.recipient_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          item.recipient_district
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all")
      result = result.filter((item) => item.donation_status === statusFilter);
    if (bloodSort !== "all")
      result = result.filter(
        (item) => item.recipient_blood_group === bloodSort
      );
    return result;
  }, [donationReqALLData, searchTerm, statusFilter, bloodSort]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-base-200 pb-20 p-2.5">
      <Container>
        <div className="pt-10">
          {/* --- TOP NAVIGATION HUD --- */}
          <div className="flex justify-between items-center mb-12">
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-red-600 transition-colors"
            >
              <FaArrowLeft /> Back to Command
            </motion.button>
            <div className="flex items-center gap-4 bg-slate-100/50 px-4 py-2 rounded-full border border-slate-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                System Synchronized
              </span>
            </div>
          </div>

          {/* --- MAIN HEADER BOARD --- */}
          <div className="relative mb-16">
            <div className="bg-slate-950 rounded-[3rem] p-12 overflow-hidden relative shadow-2xl">
              {/* Decorative SVG Pattern background */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-600 rounded-lg text-white">
                      <FaWaveSquare className="animate-pulse" />
                    </div>
                    <span className="text-red-500 font-black uppercase tracking-[0.4em] text-[10px]">
                      Real-time Database
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.8]">
                    BLOOD <br />
                    <span className="text-red-600 italic">REQUESTS</span>
                  </h1>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl min-w-[140px] text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase mb-1">
                      Live Queue
                    </p>
                    <p className="text-4xl font-black text-white">
                      {filteredAndSortedData.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- INTELLIGENT SEARCH HUB --- */}
          <div className=" mb-12">
            <div className="bg-white/80 backdrop-blur-xl border border-white p-3 rounded-4xl shadow-2xl flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative group">
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  placeholder="SCAN BY NAME OR DISTRICT..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 text-gray-500 border-none rounded-2xl py-5 pl-14 pr-6 font-black text-[10px] uppercase tracking-widest focus:ring-2 focus:ring-red-600/10 transition-all outline-none"
                />
              </div>

              <div className="flex gap-3">
                <div className="relative md:min-w-[180px]">
                  <FaFilter className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-slate-50 text-gray-500 border-none rounded-2xl py-5 pl-10 md:pl-14 pr-6 md:pr-10 font-black text-[10px] uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="all">Status: All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                  </select>
                </div>

                <div className="relative md:min-w-[180px]">
                  <FaSortAmountDown className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    onChange={(e) => setBloodSort(e.target.value)}
                    className="w-full bg-slate-50  text-gray-500  border-none rounded-2xl py-5 pl-14 pr-10 font-black text-[10px] uppercase tracking-widest outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <option value="all">Sort: Blood</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* --- RESULTS GRID --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + searchTerm + statusFilter}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {paginatedData.length > 0 ? (
                paginatedData.map((detailsData, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={detailsData?._id}
                  >
                    <DonateBloodCard
                      detailsData={detailsData}
                      refetch={refetch}
                      isLoading={isLoading}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                  <FaShieldAlt className="mx-auto text-slate-200 text-6xl mb-4" />
                  <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">
                    No Signal Detected for Current Filters
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* --- ELITE NAVIGATION PAGINATION --- */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-20">
              <nav className="inline-flex items-center bg-slate-950 p-2 rounded-4xl shadow-2xl border border-white/10">
                <button
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <FaArrowLeft className="text-xs" />
                </button>
                <div className="flex px-4 gap-2">
                  {[...Array(totalPages).keys()].map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-10 h-10 rounded-xl text-[10px] font-black transition-all ${
                        currentPage === page + 1
                          ? "bg-red-600 text-white shadow-lg shadow-red-600/40"
                          : "text-white/30 hover:text-white"
                      }`}
                    >
                      {(page + 1).toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                >
                  <FaArrowLeft className="rotate-180 text-xs" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default DonateBlood;
