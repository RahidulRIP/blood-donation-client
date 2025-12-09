import { FaMapMarkerAlt, FaTint } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import Container from "../../../../Components/Container/Container";

const DonationRequestPublicTable = ({ donationReqPendingData }) => {
  const { user } = useAuth();
  //   ............................................

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(donationReqPendingData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = donationReqPendingData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  //   ............................................

  return (
    <Container>
      <div className="py-6 md:py-20 ">
        {/*  */}
        <div className="md:flex items-center justify-between gap-5 md:mx-6 mb-6">
          <div className="mb-8 md:flex flex-col md:flex-row justify-between items-center gap-10 bg-white p-6 rounded-xl shadow-sm border-l-8 border-red-500 w-full">
            <div className="">
              <h2 className="text-2xl md:text-3xl text-gray-800">
                Welcome,{" "}
                <span className="font-bold text-red-600">
                  {user?.displayName}
                </span>
                !
              </h2>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <FaTint className="text-red-500" />
                Your Donation, Their Hope
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="stats shadow">
                <div className="stat place-items-center">
                  <div className="stat-title">Total Pending Requests</div>
                  <div className="stat-value text-red-500">
                    {donationReqPendingData.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className=" overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="py-4 pl-6">#</th>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Donation Date & Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((data, i) => (
                  <tr
                    key={data._id}
                    className="hover:bg-red-50 transition-colors duration-200"
                  >
                    <th className="pl-6 text-gray-400">{i + 1}</th>

                    {/* Recipient Name */}
                    <td>
                      <div className="font-bold text-gray-800">
                        {data?.recipient_name}
                      </div>
                    </td>

                    {/* Location */}
                    <td>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>
                          {data?.recipient_upazila}, {data?.recipient_district}
                        </span>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td>
                      <div className="text-sm">
                        <div className="font-medium text-gray-800">
                          {data?.donation_date}
                        </div>
                        <div className="text-xs text-gray-500">
                          {data?.donation_time}
                        </div>
                      </div>
                    </td>

                    {/* Blood Group */}
                    <td>
                      <div className="badge badge-error badge-outline font-bold">
                        {data?.recipient_blood_group}
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <div
                        className={`badge font-medium ${
                          data?.donation_status === "inprogress"
                            ? "badge-warning"
                            : data?.donation_status === "done"
                            ? "badge-success text-white"
                            : "badge-ghost"
                        }`}
                      >
                        {data?.donation_status}
                      </div>
                    </td>

                    {/* Actions */}

                    <>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          {/* View Details */}
                          <div className="tooltip" data-tip="View Details">
                            <Link
                              to={`/dashboard/detailsDonarReqData/${data._id}`}
                              className="btn btn-primary text-gray-600 hover:bg-gray-200"
                            >
                              Show Details
                            </Link>
                          </div>
                        </div>
                      </td>
                    </>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* ..................... */}
        <div className="flex justify-center mt-5 ">
          <div className="join">
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page + 1)}
                className={`join-item btn ${
                  currentPage === page + 1 ? "btn-active" : ""
                }`}
              >
                {page + 1}
              </button>
            ))}

            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
        {/* .................... */}
      </div>
    </Container>
  );
};

export default DonationRequestPublicTable;
