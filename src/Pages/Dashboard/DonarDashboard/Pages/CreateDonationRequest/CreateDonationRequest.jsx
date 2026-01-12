import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import { FiMail, FiUser, FiMapPin, FiActivity } from "react-icons/fi";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRegFileAlt,
  FaTint,
} from "react-icons/fa";
import Container from "../../../../../Components/Container/Container";
import { FaClock, FaHospital } from "react-icons/fa6";
import useAuth from "../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import useLoadDistricts from "../../../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../../../hooks/useLoadUpazilas";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const districts = useLoadDistricts();
  const upazilas = useLoadUpazilas();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const districtsOnly = districts.map((data) => data.name);

  const watchChangingDistrict = useWatch({
    name: "recipient_district",
    control,
  });

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
        reset();
        navigate("/dashboard");
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
      <div className="flex items-center justify-center my-10 md:my-20 md:px-4">
        <div className="w-full  rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Banner */}
          <div className="bg-linear-to-r from-red-600 to-red-500 p-8 text-white relative">
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                <FaTint className="text-3xl animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                  Emergency Blood Request
                </h1>
                <p className="text-red-100 text-sm md:text-base mt-1 flex items-center gap-2">
                  <MdOutlineNotificationImportant className="text-lg" />
                  Please fill out the details carefully to find a donor.
                </p>
              </div>
            </div>
            {/* Decorative Icon */}
            <FaTint className="absolute -right-5 -bottom-5 text-white/10 text-9xl transform -rotate-12" />
          </div>

          <div className="p-6 md:p-12">
            {user?.email && (
              <form
                onSubmit={handleSubmit(handleDonationRequest)}
                className="space-y-8"
              >
                {/* Form Sections Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {/* LEFT COLUMN: Requester & Recipient Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
                      <FiUser className="text-red-500" /> Basic Information
                    </h3>

                    {/* Requester Name */}
                    <div className="form-control">
                      <label className="label font-bold  text-xs uppercase tracking-wider">
                        User Name
                      </label>
                      <div className="relative group">
                        <input
                          {...register("user_name", { required: true })}
                          type="text"
                          className="input input-bordered w-full pl-10 text-gray-400 bg-gray-50 border-gray-200 focus:border-red-500 transition-all duration-300"
                          defaultValue={user?.displayName}
                          readOnly
                        />
                        <FiUser className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-red-500" />
                      </div>
                    </div>

                    {/* Requester Email */}
                    <div className="form-control">
                      <label className="label font-bold  text-xs uppercase tracking-wider">
                        User Email
                      </label>
                      <div className="relative group">
                        <input
                          {...register("user_email", { required: true })}
                          type="email"
                          className="input input-bordered w-full pl-10 text-gray-500 bg-gray-50 border-gray-200 "
                          defaultValue={user?.email}
                          readOnly
                        />
                        <FiMail className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                      </div>
                    </div>

                    {/* Recipient Name */}
                    <div className="form-control">
                      <label className="label font-bold text-xs uppercase tracking-wider">
                        Recipient Name
                      </label>
                      <div className="relative group">
                        <input
                          {...register("recipient_name", { required: true })}
                          type="text"
                          placeholder="Recipient's Full Name"
                          className={`input input-bordered w-full pl-10 focus:ring-0 focus:border-red-500 transition-all ${
                            errors.recipient_name
                              ? "border-red-400"
                              : "border-gray-200"
                          }`}
                        />
                        <FiUser className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-red-500" />
                      </div>
                      {errors.recipient_name && (
                        <span className="text-red-500 text-xs mt-1 font-medium">
                          Recipient name is required
                        </span>
                      )}
                    </div>

                    {/* Blood Group */}
                    <div className="form-control">
                      <label className="label font-bold  text-xs uppercase tracking-wider">
                        Required Blood Group
                      </label>
                      <div className="relative group">
                        <select
                          defaultValue="Select blood group"
                          {...register("recipient_blood_group", {
                            required: "Blood group is required",
                          })}
                          className="select select-bordered w-full pl-10 focus:border-red-500 font-semibold"
                        >
                          <option disabled>Select blood group</option>
                          {bloodGroups.map((bg) => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          ))}
                        </select>
                        <FaTint className="absolute top-1/2 -translate-y-1/2 left-3 text-red-500" />
                      </div>
                      {errors.recipient_blood_group && (
                        <span className="text-red-500 text-xs mt-1 font-medium">
                          {errors.recipient_blood_group.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN: Location & Logistics */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
                      <FiMapPin className="text-red-500" /> Logistics & Location
                    </h3>

                    {/* District & Upazila Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label font-bold text-xs uppercase tracking-wider">
                          District
                        </label>
                        <select
                          defaultValue="Select district"
                          {...register("recipient_district", {
                            required: "Required",
                          })}
                          className="select select-bordered w-full focus:border-red-500 text-sm"
                        >
                          <option disabled>Select district</option>
                          {districtsOnly.map((d, i) => (
                            <option key={i} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-control">
                        <label className="label font-bold text-xs uppercase tracking-wider">
                          Upazila
                        </label>
                        <select
                          defaultValue="Select upazila"
                          {...register("recipient_upazila", {
                            required: "Required",
                          })}
                          className="select select-bordered w-full focus:border-red-500 text-sm"
                        >
                          <option disabled>Select upazila</option>
                          {upazilasByDistrict(watchChangingDistrict).map(
                            (u, i) => (
                              <option key={i} value={u}>
                                {u}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Hospital Name */}
                    <div className="form-control">
                      <label className="label font-bold text-xs uppercase tracking-wider">
                        Hospital Name
                      </label>
                      <div className="relative group">
                        <input
                          {...register("hospital_name", { required: true })}
                          type="text"
                          placeholder="e.g. Dhaka Medical College"
                          className="input input-bordered w-full pl-10 focus:border-red-500"
                        />
                        <FaHospital className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-red-500" />
                      </div>
                    </div>

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-control">
                        <label className="label font-bold text-xs uppercase tracking-wider">
                          Date
                        </label>
                        <div className="relative group">
                          <input
                            {...register("donation_date", { required: true })}
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            className="input input-bordered w-full pl-10 focus:border-red-500 text-sm"
                          />
                          <FaCalendarAlt className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-red-500" />
                        </div>
                      </div>
                      <div className="form-control">
                        <label className="label font-bold text-xs uppercase tracking-wider">
                          Time
                        </label>
                        <div className="relative group">
                          <input
                            {...register("donation_time", { required: true })}
                            type="time"
                            className="input input-bordered w-full pl-10 focus:border-red-500 text-sm"
                          />
                          <FaClock className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-red-500" />
                        </div>
                      </div>
                    </div>

                    {/* Full Address */}
                    <div className="form-control">
                      <label className="label font-bol text-xs uppercase tracking-wider">
                        Full Address
                      </label>
                      <div className="relative group">
                        <input
                          {...register("recipient_full_address", {
                            required: true,
                          })}
                          type="text"
                          placeholder="Zahir Raihan Rd, Dhaka"
                          className="input input-bordered w-full pl-10 focus:border-red-500"
                        />
                        <FaMapMarkerAlt className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTTOM SECTION: Textarea */}
                <div className="pt-4">
                  <h3 className="text-lg font-bold border-b pb-2 mb-6 flex items-center gap-2">
                    <FaRegFileAlt className="text-red-500" /> Additional Notes
                  </h3>
                  <div className="form-control group">
                    <label className="label font-bold text-xs uppercase tracking-wider">
                      Request Message
                    </label>
                    <div className="relative">
                      <textarea
                        {...register("request_message", { required: true })}
                        placeholder="Explain why the blood is needed, or any specific instructions for the donor..."
                        className="textarea textarea-bordered w-full pl-10 focus:border-red-500 min-h-[120px] text-base"
                      ></textarea>
                      <FaRegFileAlt className="absolute top-4 left-3 text-gray-400 group-focus-within:text-red-500" />
                    </div>
                    {errors.request_message && (
                      <span className="text-red-500 text-xs mt-1 font-medium">
                        Please provide a message for the donor
                      </span>
                    )}
                  </div>
                </div>

                {/* Error Message & Submit */}
                <div className="flex flex-col items-center pt-6 border-t gap-4">
                  {error && (
                    <div className="alert alert-error shadow-sm rounded-lg py-2 max-w-md">
                      <span className="text-sm font-bold text-white">
                        {error}
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn bg-red-600 hover:bg-red-700 text-white w-full md:w-80 h-14 rounded-xl text-lg font-black shadow-lg shadow-red-200 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-none"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreateDonationRequest;