import { useForm, useWatch } from "react-hook-form";
import Container from "../../../Components/Container/Container";
import useLoadDistricts from "../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../hooks/useLoadUpazilas";
import { FaSearch, FaTint } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DonorCard from "./DonorCard/DonorCard";
import { useState } from "react";
import Loader from "../../../Components/Shared/Loader";

const SearchPage = () => {
  const [machDonor, setMachDonor] = useState([]);
  const [searched, setSearched] = useState(false);
  const axiosSecure = useAxiosSecure();
  // total users
  const { data: usersData = [], isLoading } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res?.data;
    },
  });

  const donorUsers = usersData.filter((userData) => userData.role === "donor");

  const districts = useLoadDistricts();
  const upazilas = useLoadUpazilas();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const districtsOnly = districts.map((data) => data.name);

  const watchChangingDistrict = useWatch({ name: "district", control });

  const upazilasByDistrict = (districtName) => {
    const districtData = districts.find((d) => d.name === districtName);
    const selected_District_Id = districtData?.id;
    const districtWiseUpazilasData = upazilas.filter(
      (u) => u.district_id === selected_District_Id
    );
    return districtWiseUpazilasData.map((data) => data.name);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleDonorSearch = (data) => {
    // console.log(data);

    const filteredUsers = donorUsers.filter(
      (donorUser) =>
        donorUser?.blood_group === data?.blood_group &&
        donorUser?.district === data?.district &&
        donorUser?.upazila === data?.upazila
    );
    setMachDonor(filteredUsers);
    setSearched(true);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <div className="flex items-center justify-center my-12 md:my-16 p-3.5">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-2xl border-t-4 border-red-600">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 flex items-center justify-center gap-2">
            <FaSearch className="text-red-600" /> Find Donor
          </h2>
          <p className="text-center text-gray-600">
            Select the criteria below to quickly locate a nearby blood donor.
          </p>

          <form
            onSubmit={handleSubmit(handleDonorSearch)}
            className="space-y-6"
          >
            <section className="space-y-6">
              {/* Blood Group Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Required Blood Group
                </label>
                <div className="relative">
                  <select
                    defaultValue=""
                    // Registering this field for submission
                    {...register("blood_group", {
                      required: "Please select a blood group",
                    })}
                    className="select select-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="" disabled>
                      Select blood group
                    </option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  <FaTint className="absolute top-3.5 left-3 z-1 text-red-600" />
                </div>
                {errors.blood_group && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.blood_group.message}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District
                </label>
                <div className="relative">
                  <select
                    defaultValue=""
                    {...register("district", {
                      required: "Please select a district",
                    })}
                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="" disabled>
                      Select district
                    </option>
                    {districtsOnly.map((d, i) => (
                      <option key={i} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.district && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.district.message}
                  </p>
                )}
              </div>

              {/* Upazila */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upazila
                </label>
                <div className="relative">
                  <select
                    defaultValue=""
                    {...register("upazila", {
                      required: "Please select an upazila",
                    })}
                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                    // Conditional disable based on district selection
                    disabled={!watchChangingDistrict}
                  >
                    <option value="" disabled>
                      Select upazila
                    </option>

                    {/* Options generated by the preserved logic: upazilasByDistrict */}
                    {upazilasByDistrict(watchChangingDistrict).map((u, i) => (
                      <option key={i} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.upazila && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.upazila.message}
                  </p>
                )}
              </div>
            </section>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-8"
            >
              <FaSearch /> Search Donors
            </button>
          </form>
        </div>
      </div>
      <div>
        <DonorCard machDonor={machDonor} searched={searched} />
      </div>
    </Container>
  );
};

export default SearchPage;
