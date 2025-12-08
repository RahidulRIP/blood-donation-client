import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

import useAuth from "../../../hooks/useAuth";

import { Link } from "react-router";

import Swal from "sweetalert2";

import { useEffect, useState } from "react";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { data: donationReqData = [], refetch } = useQuery({
    queryKey: ["donationReqData", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/create-donation-request/all-data?email=${user?.email}`
      );

      return res?.data;
    },
  });

  const [filteredData, setFilteredData] = useState([]);

  console.log(donationReqData);

  useEffect(() => {
    setFilteredData(donationReqData);
  }, [donationReqData]);

  const handleStatusValue = (value) => {
    console.log(value);

    const filteredByStatus = donationReqData.filter((data) =>
      data.donation_status.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filteredByStatus);
  };

  //   ............................................

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(donationReqData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedData = filteredData.slice(
    startIndex,

    startIndex + itemsPerPage
  );

  //   ............................................

  const handleDeleteDonarReq = (id) => {
    Swal.fire({
      title: "Are you sure?",

      text: "You won't be able to revert this!",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#3085d6",

      cancelButtonColor: "#d33",

      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/create-donation-request/${id}`).then((res) => {
            if (res?.data?.deletedCount) {
              refetch();

              Swal.fire({
                title: "Deleted!",

                text: "Your file has been deleted.",

                icon: "success",
              });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mx-6">
        <h2>Hey {name}! Every drop you give matters.</h2>

        <select
          onChange={(e) => handleStatusValue(e.target.value)}
          defaultValue="Pick a color"
          className="select appearance-none"
        >
          <option disabled={true}>Pick a color</option>

          <option>pending</option>

          <option>inprogress</option>

          <option>done</option>

          <option>canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}

          <thead>
            <tr>
              <th></th>

              <th>Recipient Name</th>

              <th>Recipient District</th>

              <th>Recipient Upazila</th>

              <th>Donation Date</th>

              <th>Donation Time</th>

              <th>Blood Group</th>

              <th>Donation Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((data, i) => (
              <tr key={data._id}>
                <th>{i + 1}</th>

                <td>{data?.recipient_name}</td>

                <td>{data?.recipient_district}</td>

                <td>{data?.recipient_upazila}</td>

                <td>{data?.donation_date}</td>

                <td>{data?.donation_time}</td>

                <td>{data?.recipient_blood_group}</td>

                <td>{data?.donation_status}</td>

                <td className="space-x-2.5 flex items-center">
                  <Link
                    to={`/dashboard/updateDonarReqData/${data._id}`}
                    className="btn btn-md"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDeleteDonarReq(`${data._id}`)}
                    className="btn btn-md  btn-active"
                  >
                    Delete
                  </button>

                  <Link
                    to={`/dashboard/detailsDonarReqData/${data._id}`}
                    className="btn btn-md "
                    state={donationReqData}
                  >
                    View Details
                  </Link>

                  {data?.donation_status === "inprogress" ? (
                    <>
                      <button className="btn btn-md btn-accent">Done</button>

                      <button className="btn btn-md  btn-primary text-black">
                        Cancel
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {/* ..................... */}

        <div className="flex justify-center mt-5">
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
    </div>
  );
};

export default MyDonationRequests;
