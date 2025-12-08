import { useQuery } from "@tanstack/react-query";
import Container from "../../../../Components/Container/Container";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaUsersLine } from "react-icons/fa6";
import { FcDonate } from "react-icons/fc";
import { BiDonateBlood } from "react-icons/bi";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  //   total users
  const { data: usersData = [] } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  //   fetching total blood donation request by donor
  const { data: totalDonationReqData = [] } = useQuery({
    queryKey: ["totalDonationReqData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
  });

  console.log(usersData?.length);
  console.log(totalDonationReqData?.length);

  return (
    <Container>
      <div>
        <h2>BloodLink – Modern Blood Donation System</h2>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaUsersLine size={60} />
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-primary">{usersData?.length}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FcDonate size={60} />
            </div>
            <div className="stat-title">Total Funding</div>
            <div className="stat-value text-secondary">$70</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <BiDonateBlood size={60} />
            </div>
            <div className="stat-title">Total Blood Donation Request</div>
            <div className="stat-value text-secondary">
              {totalDonationReqData?.length}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar avatar-online">
                <div className="w-16 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminHome;
