import { useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData, useParams } from "react-router";
import { FiMail, FiUser } from "react-icons/fi";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegFileAlt } from "react-icons/fa";
import Container from "../../../../../Components/Container/Container";
import { FaClock, FaHospital } from "react-icons/fa6";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const UpdateDonarReqData = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  // console.log(id);
  const { data: donarReqSingleData = [] } = useQuery({
    queryKey: ["donarReqSingleData", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `http://localhost:9000/create-donation-request/${id}`
      );
      return res?.data;
    },
  });

  const reqSingleData = donarReqSingleData;

  // ...........................................................

  const [error, setError] = useState("");

  const { districts, upazilas } = useLoaderData();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const districtsOnly = districts.map((data) => data.name);

  const watchChangingDistrict = useWatch({
    name: "recipient_district",
    control,
  });

  // function that return all upazilas districts wise
  const upazilasByDistrict = (data) => {
    const districtData = districts.find((d) => d.name === data);

    const selected_District_Id = districtData?.id;
    const districtWiseUpazilasData = upazilas.filter(
      (u) => u.district_id === selected_District_Id
    );
    const upazilasName = districtWiseUpazilasData.map((data) => data.name);
    return upazilasName;
  };

  const handleEditDonationRequest = async (data) => {
    // console.log(data);
    try {
      const res = await axiosSecure.patch(
        `/create-donation-request/${reqSingleData?._id}`,
        data
      );

      if (res?.data?.modifiedCount > 0) {
        toast.success("Data Update successful!");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <Container>
      <div className="flex items-center justify-center my-12 md:my-16 p-3.5">
        <div className="w-full  p-8 space-y-6 bg-white rounded-lg shadow-xl shadow-top">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Your Small Contribution Can Save Someone’s Life
          </h2>
          <h2 className="text-2xl font-bold text-gray-800">
            Update Your Information:
          </h2>
          {user?.email && (
            <form
              onSubmit={handleSubmit(handleEditDonationRequest)}
              className="space-y-4"
            >
              <section className="md:flex gap-28">
                <section className="flex-1 space-y-6">
                  {/* name  */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      User Name
                    </label>
                    <div className="relative">
                      <input
                        {...register("user_name", { required: true })}
                        type="text"
                        placeholder="Enter your name"
                        className="input input-bordered w-full pl-10 outline-none"
                        defaultValue={reqSingleData?.user_name}
                        readOnly
                      />
                      <FiUser className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                  </div>
                  {/* email  */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      User Email
                    </label>
                    <div className="relative">
                      <input
                        {...register("user_email", { required: true })}
                        type="email"
                        placeholder="Enter your email address"
                        className="input input-bordered w-full pl-10 outline-none"
                        defaultValue={reqSingleData?.user_email}
                        readOnly
                      />
                      <FiMail className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                  </div>

                  {/* recipient Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Recipient Name
                    </label>
                    <div className="relative">
                      <input
                        {...register("recipient_name", { required: true })}
                        type="text"
                        placeholder="Enter recipient  name"
                        className="input input-bordered w-full pl-10 outline-none"
                        defaultValue={reqSingleData?.recipient_name}
                      />
                      <FiUser className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                    {errors.recipient_name && (
                      <p className="text-red-500 text-sm mt-1">
                        Name is required
                      </p>
                    )}
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Recipient Blood Group
                    </label>
                    <select
                      {...register("recipient_blood_group", {
                        required: "Select your blood group",
                      })}
                      className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value={reqSingleData?.recipient_blood_group}>
                        {reqSingleData?.recipient_blood_group}
                      </option>

                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                    {errors.recipient_blood_group && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.recipient_blood_group.message}
                      </p>
                    )}
                  </div>

                  {/*hospital name  */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Hospital Name
                    </label>
                    <div className="relative">
                      <input
                        {...register("hospital_name", { required: true })}
                        type="text"
                        placeholder="Enter recipient hospital name"
                        className="input input-bordered w-full pl-10 outline-none"
                        defaultValue={reqSingleData?.hospital_name}
                      />
                      <FaHospital className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                    {errors.hospital_name && (
                      <p className="text-red-500 text-sm mt-1">
                        Recipient hospital name
                      </p>
                    )}
                  </div>
                </section>
                <section className="flex-1 space-y-6">
                  {/* District */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Recipient District
                    </label>
                    <select
                      defaultValue={reqSingleData?.recipient_district}
                      {...register("recipient_district", {
                        required: "Select your district",
                      })}
                      className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option disabled>Select district</option>

                      {districtsOnly.map((d, i) => (
                        <option key={i} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    {errors.recipient_district && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.recipient_district.message}
                      </p>
                    )}
                  </div>
                  {/* upazila  */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Recipient Upazila
                    </label>
                    <select
                      defaultValue={reqSingleData?.recipient_upazila}
                      {...register("recipient_upazila", {
                        required: "Select your upazila",
                      })}
                      className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value={reqSingleData?.recipient_upazila}>
                        {reqSingleData?.recipient_upazila}
                      </option>

                      {upazilasByDistrict(watchChangingDistrict).map((u, i) => (
                        <option key={i} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                    {errors.recipient_upazila && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.recipient_upazila.message}
                      </p>
                    )}
                  </div>

                  {/* donation date  */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Donation Date
                    </label>
                    <div className="relative">
                      <input
                        {...register("donation_date", {
                          required: true,
                        })}
                        type="date"
                        placeholder="full address of recipient location "
                        className="input input-bordered w-full pl-10 outline-none"
                        defaultValue={reqSingleData?.donation_date}
                      />
                      <FaCalendarAlt className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                    {errors.donation_date && (
                      <p className="text-red-500 text-sm mt-1">
                        donation date is require.
                      </p>
                    )}
                  </div>

                  {/* donation time  */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Donation Time
                    </label>
                    <div className="relative">
                      <input
                        {...register("donation_time", {
                          required: true,
                        })}
                        type="time"
                        placeholder="full address of recipient location "
                        className="input input-bordered w-full pl-10 outline-none"
                        defaultValue={reqSingleData?.donation_time}
                      />
                      <FaClock className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                    {errors.donation_time && (
                      <p className="text-red-500 text-sm mt-1">
                        donation is require.
                      </p>
                    )}
                  </div>

                  {/*full address recipient location  */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Full Address
                    </label>
                    <div className="relative">
                      <input
                        {...register("recipient_full_address", {
                          required: true,
                        })}
                        type="text"
                        placeholder="like: Zahir Raihan Rd, Dhaka "
                        className="input input-bordered w-full pl-10 outline-none"
                        defaultValue={reqSingleData?.recipient_full_address}
                      />

                      <FaMapMarkerAlt className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                    {errors.recipient_full_address && (
                      <p className="text-red-500 text-sm mt-1">
                        Full address of recipient location required.
                      </p>
                    )}
                  </div>
                </section>
              </section>

              {/* request message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Request Message
                </label>

                <div className="relative">
                  <textarea
                    {...register("request_message", { required: true })}
                    placeholder="Write additional details about the donation request..."
                    className="textarea textarea-bordered w-full pl-10 outline-none min-h-24"
                    defaultValue={reqSingleData?.request_message}
                  ></textarea>

                  <FaRegFileAlt className="absolute top-3 left-3 text-gray-400" />
                </div>

                {errors.request_message && (
                  <p className="text-red-500 text-sm mt-1">
                    Description is required.
                  </p>
                )}
              </div>
              {/* error  */}
              {error && <h2 className="text-red-600">{error}</h2>}
              <button type="submit" className="btn_primary">
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default UpdateDonarReqData;
