import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container/Container";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Form from "../../../Components/Dashboard/Form";
import useLoadDistricts from "../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../hooks/useLoadUpazilas";
import { FaEnvelope, FaUser } from "react-icons/fa6";

const MyProfile = () => {
  const districts = useLoadDistricts();
  const upazilas = useLoadUpazilas();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data[0];
    },
    enabled: !!user?.email,
  });
  // console.log(userData);
  return (
    <div>
      <Container>
        {user?.email && (
          <div className="mx-auto flex flex-col items-center  w-full mt-1.5 md:mt-6 bg-base-200 min-h-screen">
            <div className="bg-amber-400  h-72 rounded-t-2xl relative w-full"></div>
            <div className="flex justify-center -mt-12 z-1">
              <img
                className="w-32 h-32 rounded-full object-cover"
                src={user?.photoURL}
                alt=""
              />
            </div>
            <div>
              <div className="text-center p-4">
                <h2 className="text-lg mb-1 text-gray-800">
                  <span className="font-medium mr-1 text-gray-600">
                    <FaUser className="inline w-4 h-4 mr-1 text-blue-500" />
                    Name:
                  </span>

                  <span className="font-semibold">{userData?.name}</span>
                </h2>

                <h2 className="text-lg text-gray-800">
                  <span className="font-medium mr-1 text-gray-600">
                    <FaEnvelope className="inline w-4 h-4 mr-1 text-green-500" />
                    Email:
                  </span>

                  <span className="font-semibold">{user?.email}</span>
                </h2>
              </div>
              <Form
                districts={districts}
                upazilas={upazilas}
                userData={userData}
                refetch={refetch}
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyProfile;
