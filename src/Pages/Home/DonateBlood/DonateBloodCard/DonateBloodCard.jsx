import {
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaTint,
  FaCommentDots,
} from "react-icons/fa";
import Container from "../../../../Components/Container/Container";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";

const DonateBloodCard = ({ detailsData, refetch }) => {
  const { user } = useAuth();
  const {
    donation_date,
    donation_status,
    donation_time,
    hospital_name,
    recipient_blood_group,
    recipient_district,
    recipient_full_address,
    recipient_name,
    recipient_upazila,
    request_message,
    user_email,
    user_name,
    _id,
  } = detailsData;

  const axiosSecure = useAxiosSecure();

  const handleChangeStatus = async (id) => {
    const bloodDonorInfo = {
      bloodDonorName: user?.displayName,
      bloodDonorEmail: user?.email,
    };

    console.log(bloodDonorInfo);

    try {
      const res = await axiosSecure.patch(
        `/update-donation-status/${id}`,
        bloodDonorInfo
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`Donation Status Successfully Updated`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <div className="bg-base-200">
        <div className="max-w-4xl mx-auto">
          <div className="card lg:card-side bg-base-100 shadow-xl overflow-hidden border-l-8 border-primary">
            {/* Blood Group Left Section */}
            <div className="bg-gray-400 flex flex-col items-center justify-center text-primary-content p-8 min-w-[230px]">
              <FaTint className="text-6xl mb-2 animate-pulse text-red-600" />
              <h1 className="text-5xl font-extrabold">
                {recipient_blood_group}
              </h1>
              <p className="mt-2 font-medium uppercase tracking-widest">
                Required
              </p>
              <div
                className={`mt-4 badge ${
                  donation_status === "pending"
                    ? "badge-warning"
                    : "badge-success"
                } badge-lg`}
              >
                <h2 className="flex items-center">
                  <span className="font-bold text-lg">Status : </span>{" "}
                  <span
                    className={`font-medium ml-1 ${
                      (donation_status === "cancel" && "text-red-500") ||
                      (donation_status === "inprogress" && "text-white") ||
                      (donation_status === "done" && "text-[#8B5CF6]")
                    }`}
                  >
                    {donation_status}
                  </span>
                </h2>
              </div>
            </div>

            {/* Details Section */}
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="card-title text-3xl font-bold text-gray-800">
                    {recipient_name}
                  </h2>
                  <p className="text-sm text-gray-500 italic">
                    Requested by: {user_name}
                  </p>
                </div>
              </div>

              <div className="divider my-2"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                {/* hospital_name  */}
                <div className="flex items-start gap-3">
                  <FaHospital className="mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Hospital</p>
                    <p className="text-gray-600">{hospital_name}</p>
                  </div>
                </div>

                {/* address and location  */}
                <div className="flex items-start gap-3 overflow-y-auto h-20">
                  <FaMapMarkerAlt className="mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-600">
                      {recipient_upazila}, {recipient_district}
                    </p>
                    <p className="text-xs text-gray-500 leading-tight">
                      {recipient_full_address}
                    </p>
                  </div>
                </div>

                {/* Donation Date  */}
                <div className="flex items-start gap-3 ">
                  <FaCalendarAlt className="mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Donation Date</p>
                    <p className="text-gray-600">{donation_date}</p>
                  </div>
                </div>

                {/* donation_time  */}
                <div className="flex items-start gap-3">
                  <FaClock className="mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-gray-600">{donation_time}</p>
                  </div>
                </div>

                {/* Requester Contact  */}
                <div className="flex items-start gap-3">
                  <FaEnvelope className="mt-1 text-primary" />
                  <div>
                    <p className="font-semibold">Requester Contact</p>
                    <p className="text-gray-600">{user_email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-dashed border-primary h-32 overflow-y-auto">
                <p className="flex items-center gap-2 font-semibold text-primary mb-1">
                  <FaCommentDots /> Message:
                </p>

                <p className="text-gray-700 italic">"{request_message}"</p>
              </div>
              <button
                onClick={() => handleChangeStatus(_id)}
                className="btn btn-primary text-black hover:text-white hover:bg-red-400"
                disabled={
                  donation_status === "inprogress" ||
                  donation_status === "done" ||
                  (donation_status === "cancel" && true)
                }
              >
                DONATE BlOOD
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonateBloodCard;
