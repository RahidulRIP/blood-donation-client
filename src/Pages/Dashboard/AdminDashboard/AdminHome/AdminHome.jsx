import { useQuery } from "@tanstack/react-query";
import Container from "../../../../Components/Container/Container";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUsers, FaHandHoldingUsd, FaFileAlt } from "react-icons/fa"; // Using FaUsers, FaHandHoldingUsd, FaFileAlt for relevance
import { BiSolidDonateBlood } from "react-icons/bi"; // Using BiSolidDonateBlood
import BarChart from "../../../../Components/Shared/BarChart";

const AdminHome = ({ role }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: fundsData = [] } = useQuery({
    queryKey: ["fundingData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-funds-data`);
      return data;
    },
  });

  const amounts = fundsData.map((data) => data.amount);

  const totalAmount = amounts.reduce((total, amount) => {
    return total + amount;
  }, 0);

  // total users
  const { data: usersData = [] } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  // fetching total blood donation request by donor
  const { data: totalDonationReqData = [] } = useQuery({
    queryKey: ["totalDonationReqData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
  });

  return (
    <Container>
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg mb-10 border-l-8 border-red-600 md:flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center gap-3">
              <BiSolidDonateBlood className="text-red-600" />
              BloodLink – {role === "volunteer" ? <>Volunteer </> : <>Admin </>}
              Dashboard
            </h2>
            <p className="text-lg text-gray-500 mt-2">
              Welcome,{" "}
              <span className="font-bold">{user?.displayName || "Admin"}</span>!
              Here's a snapshot of your system's performance.
            </p>
          </div>
          <div className="stats shadow mt-8 bg-gray-300">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar avatar-online">
                  <div className="w-16 rounded-full">
                    <img src={user?.photoURL} alt="User Avatar" />
                  </div>
                </div>
              </div>
              <div className="stat-title">
                {role === "volunteer" ? <>Volunteer</> : <>Admin</>}
              </div>
              <div className="stat-value">
                {user?.displayName?.split(" ")[0] || "Admin"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Users */}
          <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-blue-500">
            <div className="card-body p-6 items-center text-center">
              <div className="text-blue-500 mb-3 bg-blue-100 p-4 rounded-full">
                <FaUsers size={36} />
              </div>
              <h3 className="card-title text-2xl font-bold text-gray-800">
                {usersData?.length || 0}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-wide">
                Total Users
              </p>
            </div>
          </div>

          {/* Funding Card */}
          <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-green-500">
            <div className="card-body p-6 items-center text-center">
              <div className="text-green-500 mb-3 bg-green-100 p-4 rounded-full">
                <FaHandHoldingUsd size={36} />
              </div>
              <h3 className="card-title text-2xl font-bold text-gray-800">
                ${totalAmount.toFixed(2)}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-wide">
                Total Funds Raised
              </p>
            </div>
          </div>

          {/*Total Blood Donation Requests  */}
          <div className="card bg-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-[1.02] border-t-4 border-red-600">
            <div className="card-body p-6 items-center text-center">
              <div className="text-red-600 mb-3 bg-red-100 p-4 rounded-full">
                <FaFileAlt size={36} />
              </div>
              <h3 className="card-title text-2xl font-bold text-gray-800">
                {totalDonationReqData?.length || 0}
              </h3>
              <p className="text-gray-500 text-sm uppercase tracking-wide">
                Total Donation Requests
              </p>
            </div>
          </div>
        </div>
        <div className="py-6 md:py-20 ">
          <BarChart
            totalUsers={usersData?.length || 0}
            totalFundsRaised={totalAmount.toFixed(2)}
            totalDonationRequests={totalDonationReqData?.length || 0}
          />
        </div>
      </div>
    </Container>
  );
};

export default AdminHome;
