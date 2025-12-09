import { useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import { FiMail, FiUser } from "react-icons/fi";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegFileAlt } from "react-icons/fa";
import Container from "../../../../../Components/Container/Container";
import { FaClock, FaHospital } from "react-icons/fa6";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import useLoadDistricts from "../../../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../../../hooks/useLoadUpazilas";

const CreateDonationRequest = () => {
  const districts = useLoadDistricts();
  const upazilas = useLoadUpazilas();

  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  // const { upazilas } = useLoaderData();
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

  const handleDonationRequest = async (data) => {
    try {
      const res = await axiosSecure.post("/create-donation-request", data);

      if (res?.data?.insertedId) {
        toast.success("Donation request created successfully.");
      }
      if (res?.data?.message) {
        toast.error(`${res?.data?.message}`);
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
          {user?.email && (
            <form
              onSubmit={handleSubmit(handleDonationRequest)}
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
                        defaultValue={user?.displayName}
                        readOnly
                      />
                      <FiUser className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                    {errors.user_name && (
                      <p className="text-red-500 text-sm mt-1">
                        Name is required
                      </p>
                    )}
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
                        defaultValue={user?.email}
                        readOnly
                      />
                      <FiMail className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    </div>
                    {errors.user_email && (
                      <p className="text-red-500 text-sm mt-1">
                        Email is required
                      </p>
                    )}
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
                      defaultValue="Select blood group"
                      {...register("recipient_blood_group", {
                        required: "Select your blood group",
                      })}
                      className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option disabled>Select blood group</option>

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
                      defaultValue="Select district"
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
                      defaultValue="Select upazila"
                      {...register("recipient_upazila", {
                        required: "Select your upazila",
                      })}
                      className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option disabled>Select upazila</option>

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
                        min={new Date().toISOString().split("T")[0]}
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
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CreateDonationRequest;
