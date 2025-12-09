import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  FaUserCircle,
  FaEdit,
  FaMapMarkerAlt,
  FaTint,
  FaMailBulk,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Form = ({ userData, districts, upazilas, refetch }) => {
  const [editProfile, setEditProfile] = useState(true);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  // ............................................
  const districtsOnly = districts.map((data) => data.name);

  const watchChangingDistrict = useWatch({ name: "district", control });

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
  // ............................................
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleUpdateData = async (data) => {
    setEditProfile(true);

    try {
      const res = await axiosSecure.patch(`/users/${userData?._id}`, data);

      if (res?.data?.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };
  return (
    <div>
      <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-10 gap-6  border-b ">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-5xl text-blue-600" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            User Profile Details
          </h2>
        </div>
        <div className="flex justify-between items-center  gap-6">
          {editProfile ? (
            <button
              onClick={handleEditProfile}
              className={`flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300`}
            >
              <FaEdit className="text-lg" />
              Edit Profile
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {editProfile ? (
        <div className=" bg-gray-50 flex items-center justify-center p-4 sm:p-10">
          <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl p-6 sm:p-12 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                <label className="flex items-center text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  District
                </label>
                <p className="text-xl font-semibold text-gray-800">
                  {userData?.district}
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                <label className="flex items-center text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  Upazila
                </label>
                <p className="text-xl font-semibold text-gray-800">
                  {userData?.upazila}
                </p>
              </div>

              <div className="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                <label className="flex items-center text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">
                  <FaTint className="mr-2 text-red-500" />
                  Blood Group
                </label>
                <p className="text-xl font-semibold text-gray-800">
                  {userData?.blood_group}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-xl p-6 border border-gray-200">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(handleUpdateData)}
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <FaUser className="inline mr-1 text-blue-500" />
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={userData?.name}
                  {...register("name", { required: "Name is required" })}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <FaMailBulk className="inline mr-1 text-blue-500" />
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={userData?.email}
                  readOnly
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <FaMapMarkerAlt className="inline mr-1 text-blue-500" />
                  District
                </label>
                <select
                  defaultValue={userData?.district}
                  {...register("district", {
                    required: "Select your district",
                  })}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option disabled value={userData?.district}>
                    {userData?.district}
                  </option>

                  {districtsOnly.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <FaMapMarkerAlt className="inline mr-1 text-blue-500" />
                  Upazila
                </label>
                <select
                  {...register("upazila", {
                    required: "Select your upazila",
                  })}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option disabled value={userData?.upazila}>
                    {userData?.upazila}
                  </option>

                  {upazilasByDistrict(watchChangingDistrict).map((u, i) => (
                    <option key={i} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                {errors.upazila && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.upazila.message}
                  </p>
                )}
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <FaTint className="inline mr-1 text-red-500" />
                  Blood Group
                </label>
                <select
                  defaultValue={userData?.blood_group}
                  {...register("blood_group", {
                    required: "Select your blood group",
                  })}
                  className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value={userData?.blood_group} disabled>
                    {userData?.blood_group}
                  </option>

                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
                {errors.blood_group && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.blood_group.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <input
                  type="submit"
                  value="Save"
                  className="btn_primary px-3 py-2 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      {/* .............. */}
    </div>
  );
};

export default Form;
