import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonateBloodCard from "./DonateBloodCard/DonateBloodCard";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import Container from "../../../Components/Container/Container";

const DonateBlood = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: donationReqData = [] ,refetch} = useQuery({
    queryKey: ["donationReqData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
  });
  // console.log(donationReqData);
  return (
        <Container>
    <div>
      <div>
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Requests
        </button>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2.5">
          {donationReqData.map((detailsData) => (
            <DonateBloodCard key={detailsData?._id} detailsData={detailsData} refetch={refetch}/>
          ))}
        </div>
    </div>
      </Container>
  );
};

export default DonateBlood;
