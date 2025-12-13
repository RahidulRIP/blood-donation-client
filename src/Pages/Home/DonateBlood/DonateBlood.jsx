import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonateBloodCard from "./DonateBloodCard/DonateBloodCard";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import Container from "../../../Components/Container/Container";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Shared/Loader";

const DonateBlood = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  // console.log(user);
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

  // console.log(donationReqALLData);

  // pagination start here
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(donationReqALLData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = donationReqALLData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // pagination end here

  if (isLoading) {
    return <Loader />;
  }
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
          {paginatedData.map((detailsData) => (
            <DonateBloodCard
              key={detailsData?._id}
              detailsData={detailsData}
              refetch={refetch}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-5">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`join-item btn ${
                  currentPage === page + 1 ? "btn-primary text-black" : ""
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage(currentPage + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonateBlood;
