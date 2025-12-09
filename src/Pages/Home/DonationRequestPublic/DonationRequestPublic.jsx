import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationRequestPublicTable from "./DonationRequestPublicTable/DonationRequestPublicTable";

const DonationRequestPublic = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donationReqAllData = [] } = useQuery({
    queryKey: ["donationReqAllData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
  });

  const donationReqPendingData = donationReqAllData.filter(
    (data) => data.donation_status === "pending"
  );

  console.log(donationReqPendingData);
  return (
    <div>
      <div>
        <DonationRequestPublicTable
          donationReqPendingData={donationReqPendingData}
        />
      </div>
    </div>
  );
};

export default DonationRequestPublic;
