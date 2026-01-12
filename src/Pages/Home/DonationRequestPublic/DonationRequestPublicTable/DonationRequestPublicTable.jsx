import {
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaChevronRight,
  FaDatabase,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { useState, useMemo } from "react"; // Added useMemo
import Container from "../../../../Components/Container/Container";
import Loader from "../../../../Components/Shared/Loader";
import { motion, AnimatePresence } from "framer-motion";

const DonationRequestPublicTable = ({
  donationReqPendingData = [],
  isLoading,
}) => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- New State for Search, Filter, Sort ---
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest, oldest

  const itemsPerPage = 6;

  // --- Logic: Search, Filter, and Sort ---
  const filteredAndSortedData = useMemo(() => {
    let result = [...donationReqPendingData];

    // 1. Search Logic (by Recipient Name or Upazila)
    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.recipient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.recipient_upazila.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter Logic (by Blood Group)
    if (filterBloodGroup) {
      result = result.filter((item) => item.recipient_blood_group === filterBloodGroup);
    }

    // 3. Sort Logic (by Date)
    result.sort((a, b) => {
      const dateA = new Date(a.donation_date);
      const dateB = new Date(b.donation_date);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [donationReqPendingData, searchTerm, filterBloodGroup, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] animate-pulse">
          Syncing Network...
        </p>
      </div>
    );
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-12 md:py-24"
      >
        {/* TOP COMMAND BAR */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-6 mb-10 px-2">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
                Real-time Network Monitor
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">
              Pending <span className="text-red-600 italic">Transfusions</span>
            </h2>
          </motion.div>

          {/* SEARCH & FILTER CONTROLS */}
          <motion.div 
             initial={{ y: 10, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="flex flex-wrap items-center gap-4 bg-white text-gray-500 p-3 rounded-4xl shadow-xl border border-slate-100"
          >
            {/* Search Input */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input 
                type="text" 
                placeholder="SEARCH RECIPIENT..."
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-red-600 w-48 transition-all"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              />
            </div>

            {/* Blood Group Filter */}
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-2xl border border-slate-100">
              <FaFilter className="text-slate-400 text-[10px]" />
              <select 
                className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer"
                value={filterBloodGroup}
                onChange={(e) => {setFilterBloodGroup(e.target.value); setCurrentPage(1);}}
              >
                <option value="">ALL GROUPS</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-2xl border border-slate-100">
              <FaSortAmountDown className="text-slate-400 text-[10px]" />
              <select 
                className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">NEWEST FIRST</option>
                <option value="oldest">OLDEST FIRST</option>
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 bg-slate-50 border border-slate-100 p-4 rounded-3xl px-8 shadow-inner"
          >
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Filtered Result
              </p>
              <p className="text-2xl font-black text-slate-950">
                {filteredAndSortedData.length}
              </p>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Active User
              </p>
              <p className="text-sm font-black text-red-600 uppercase italic truncate max-w-[120px]">
                {user?.displayName?.split(" ")[0] || "Guest"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* ENTERPRISE GRADE TABLE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="bg-slate-950 border-none text-left">
                  <th className="py-7 pl-10 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    ID
                  </th>
                  <th className="py-7 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    Recipient Profile
                  </th>
                  <th className="py-7 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    Logistics Hub
                  </th>
                  <th className="py-7 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    Scheduled Time
                  </th>
                  <th className="py-7 text-white font-black uppercase tracking-[0.2em] text-[10px] text-center">
                    Group
                  </th>
                  <th className="py-7 text-white font-black uppercase tracking-[0.2em] text-[10px]">
                    Status
                  </th>
                  <th className="py-7 pr-10 text-white font-black uppercase tracking-[0.2em] text-[10px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {paginatedData.length === 0 ? (
                    <motion.tr
                      key="no-data"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td colSpan="7" className="py-24 text-center">
                        <FaDatabase className="mx-auto text-slate-100 text-5xl mb-4" />
                        <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">
                          No encrypted data packets found matching criteria
                        </p>
                      </td>
                    </motion.tr>
                  ) : (
                    paginatedData.map((data, index) => (
                      <motion.tr
                        key={data._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-slate-50/50 transition-all duration-300"
                      >
                        <td className="py-7 pl-10">
                          <span className="text-slate-300 font-black text-xs">
                            {(startIndex + index + 1).toString().padStart(2, "0")}
                          </span>
                        </td>

                        <td className="py-7">
                          <p className="font-black text-slate-900 uppercase tracking-tight text-sm mb-0.5 group-hover:text-red-600 transition-colors">
                            {data.recipient_name}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            UID: {data._id.slice(-8)}
                          </p>
                        </td>

                        <td className="py-7">
                          <div className="flex flex-col gap-1 text-left">
                            <div className="flex items-center gap-1.5 text-slate-700 font-black text-[11px] uppercase tracking-tighter">
                              <FaMapMarkerAlt className="text-red-600 text-[10px]" />
                              {data.recipient_upazila}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase ml-4">
                              {data.recipient_district}
                            </span>
                          </div>
                        </td>

                        <td className="py-7">
                          <div className="flex flex-col gap-1 text-left">
                            <div className="flex items-center gap-2 text-slate-900 font-black text-xs">
                              <FaCalendarAlt className="text-red-600/50 text-[10px]" />{" "}
                              {data.donation_date}
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                              <FaClock className="text-slate-300 text-[10px]" />{" "}
                              {data.donation_time}
                            </div>
                          </div>
                        </td>

                        <td className="py-7 text-center">
                          <div className="inline-flex flex-col items-center justify-center w-12 h-12 bg-white border-2 border-slate-100 rounded-2xl group-hover:border-red-600 group-hover:shadow-lg group-hover:shadow-red-100 transition-all duration-500">
                            <span className="text-xs font-black text-slate-950">
                              {data.recipient_blood_group}
                            </span>
                            <FaTint className="text-[8px] text-red-600 mt-0.5" />
                          </div>
                        </td>

                        <td className="py-7">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                data.donation_status === "inprogress"
                                  ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse"
                                  : data.donation_status === "done"
                                  ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                  : "bg-slate-300"
                              }`}
                            />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                              {data.donation_status}
                            </span>
                          </div>
                        </td>

                        <td className="py-7 pr-10 text-right">
                          <Link
                            to={`/dashboard/detailsDonarReqData/${data._id}`}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-950 text-white font-black uppercase tracking-widest text-[9px] rounded-xl hover:bg-red-600 transition-all shadow-xl active:scale-95 group/btn"
                          >
                            Show Data
                            <FaChevronRight className="text-[8px] group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* PAGINATION CONTROL */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <div className="inline-flex items-center bg-white p-2 rounded-4xl shadow-xl border border-slate-100 gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(currentPage - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-950 hover:bg-slate-50 disabled:opacity-20 transition-all"
              >
                <FaChevronRight className="rotate-180" />
              </button>

              <div className="flex gap-1 px-4">
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-10 h-10 rounded-2xl font-black text-[10px] transition-all ${
                      currentPage === page + 1
                        ? "bg-red-600 text-white shadow-lg shadow-red-200"
                        : "text-slate-400 hover:text-slate-950"
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
                className="w-12 h-12 flex items-center justify-center rounded-2xl text-slate-950 hover:bg-slate-50 disabled:opacity-20 transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default DonationRequestPublicTable;