import { FaCheckCircle, FaTint, FaUserCircle } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";

const DonorCard = ({ machDonor, searched }) => {
  return (
    <div className="pb-6 md:pb-20">
      {machDonor?.length ? (
        <div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-md border border-green-300 w-fit mb-2.5 md:mb-6">
            <FaCheckCircle className="w-5 h-5" />
            <span className="font-medium">
              Donor(s) found for the given information.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  p-2.5">
            {machDonor.map((donor) => (
              <div
                key={donor._id}
                className="card w-full bg-white shadow-xl hover:shadow-2xl transition duration-300 border-t-4 border-red-600"
              >
                <div className="card-body p-5 md:p-6">
                  <div className="flex items-center gap-4 border-b pb-4 mb-4">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2">
                        {donor.photoURL ? (
                          <img src={donor.photoURL} />
                        ) : (
                          <FaUserCircle className="w-full h-full text-gray-400 p-1" />
                        )}
                      </div>
                    </div>

                    <div className="flex grow">
                      <h2 className="card-title text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUserCircle className="text-red-600" />
                        {name}
                      </h2>

                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`badge badge-ghost text-sm font-medium capitalize`}
                        >
                          {donor.role}
                        </div>
                        <div
                          className={`badge ${
                            donor?.status === "active"
                              ? "bg-green-400"
                              : "bg-red-400"
                          } text-white badge-sm gap-1`}
                        >
                          {donor.statusIcon}
                          {donor.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                    {/* Blood Group */}
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full  shadow-md`}>
                        <FaTint className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold uppercase">Blood Group</p>
                        <p className="text-lg font-extrabold text-red-600">
                          {donor.blood_group}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-blue-500 text-white shadow-md">
                        <ImLocation2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="capitalize">
                          {donor.upazila}, {donor.district}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 col-span-1 sm:col-span-2">
                      <div className="p-2 rounded-full bg-yellow-500 text-white shadow-md">
                        <FaEnvelope className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="truncate w-full">{donor.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer*/}
                  <div className="card-actions justify-end mt-4 pt-3 border-t">
                    <button className="btn btn-sm btn-outline btn-error hover:text-white">
                      Request Donation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {searched && (
            <h2 className="text-red-300 text-center text-2xl font-black">
              No donor found in that information
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default DonorCard;
