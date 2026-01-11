import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonationRequestPublicTable from "./DonationRequestPublicTable/DonationRequestPublicTable";
import { useEffect } from "react";
import Loader from "../../../Components/Shared/Loader";

const DonationRequestPublic = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const axiosSecure = useAxiosSecure();

  const { data: donationReqAllData = [], isLoading } = useQuery({
    queryKey: ["donationReqAllData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/create-donation-request/all-data`);
      return res?.data;
    },
  });

  const donationReqPendingData = donationReqAllData.filter(
    (data) => data.donation_status === "pending"
  );



  return (
    <div>
      <div>
        <DonationRequestPublicTable
          donationReqPendingData={donationReqPendingData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DonationRequestPublic;





// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import DonationRequestPublicTable from "./DonationRequestPublicTable/DonationRequestPublicTable";
// import { useEffect } from "react";

// const DonationRequestPublic = () => {
//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//   }, []);

//   const axiosSecure = useAxiosSecure();

//   const { data: donationReqAllData = [] } = useQuery({
//     queryKey: ["donationReqAllData"],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/create-donation-request/all-data`);
//       return res?.data;
//     },
//   });

//   const donationReqPendingData = donationReqAllData.filter(
//     (data) => data.donation_status === "pending"
//   );

//   // console.log(donationReqPendingData);
//   return (
//     <div>
//       <div>
//         <DonationRequestPublicTable
//           donationReqPendingData={donationReqPendingData}
//         />
//       </div>
//     </div>
//   );
// };

// export default DonationRequestPublic;
