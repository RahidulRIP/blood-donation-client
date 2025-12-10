import { useState } from "react";
import { useForm } from "react-hook-form"; // For the funding form modal
import { FaPlus, FaCalendarAlt, FaUser, FaDollarSign } from "react-icons/fa"; // React Icons
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../Components/Shared/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container/Container";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: fundingData = [], refetch } = useQuery({
    queryKey: ["fundingData", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-funds-data?email=${user?.email}`
      );
      return data;
    },
  });
  console.log(fundingData);

  const handleFundSubmit = async (data) => {
    {
      !user.email && <Loader />;
    }

    Swal.fire({
      title: "Confirm Donation",
      text: `Are you sure you want to donate $${parseInt(data?.amount)}? This action cannot be undone.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Donate!",
    }).then((result) => {
      if (result.isConfirmed) {
        const donationData = {
          amount: parseInt(data?.amount),
          name: data?.name,
          user_email: user?.email,
          donate_date: new Date().toLocaleString(),
        };

        try {
          axiosSecure.post("/donation-funds", donationData).then((res) => {
            if (res?.data?.insertedId) {
              refetch();
              Swal.fire({
                title: "Donation Successful!",
                text: "Thank you for your generous contribution. It helps us save lives!",
                icon: "success",
              });
            }
            // closing modal after clicked in donateNow
            setIsModalOpen(false);
            reset();
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <Container>
      <div className=" p-4 sm:p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          Organization Funding Tracker
        </h2>

        <div className="flex justify-end mb-6">
          <button
            className="btn btn-primary text-black btn-lg shadow-lg"
            // opening modal from here by calling
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2 text-red-400" /> Give Fund
          </button>
        </div>

        {/*Table*/}
        <div className="bg-white shadow-xl rounded-2xl overflow-x-auto md:max-w-6xl mx-auto ">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>
                  <FaUser className="inline mr-1" /> Donor Name
                </th>

                <th>
                  <FaDollarSign className="inline mr-1" /> Fund Amount
                </th>
                <th>
                  <FaCalendarAlt className="inline mr-1" /> Funding Date
                </th>
              </tr>
            </thead>

            <tbody>
              {fundingData.map((data) => (
                <tr key={data?._id} className="hover:bg-base-100">
                  <td className="font-medium text-gray-700">{data?.name}</td>
                  <td>
                    <span className="badge badge-success badge-lg font-bold">
                      {data?.amount} $
                    </span>
                  </td>
                  <td className="text-sm text-gray-500">{data?.donate_date}</td>
                </tr>
              ))}

              {fundingData.length ? (
                ""
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-8 text-lg text-gray-500"
                  >
                    "No funds recorded yet. Be the first!"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal: DaisyUI Modal  */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-2xl text-primary mb-4">
                Make a Donation
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Your generosity helps us save lives. Payments are processed
                securely via Stripe.
              </p>

              <form onSubmit={handleSubmit(handleFundSubmit)}>
                {/* Amount Input */}
                <div className="form-control w-full mb-4">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Donation Amount ($)
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    placeholder="e.g., 50.00"
                    className={`input input-bordered w-full ${
                      errors.amount ? "input-error" : ""
                    }`}
                    {...register("amount", {
                      required: "Amount is required",
                      min: { value: 5, message: "Minimum donation is $5" },
                    })}
                  />
                  {errors.amount && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.amount.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control w-full mb-6">
                  <label className="label">
                    <span className="label-text font-semibold">Your Name</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.displayName}
                    placeholder="Anonymous"
                    className="input input-bordered w-full"
                    {...register("name")}
                    readOnly
                  />
                </div>

                <div className="modal-action mt-8">
                  <button type="submit" className="btn btn-primary text-black">
                    Donate Now
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => setIsModalOpen(false)}
            ></div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default FundingPage;
