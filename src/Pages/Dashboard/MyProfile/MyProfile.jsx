import { useQuery } from "@tanstack/react-query";
import Container from "../../../Components/Container/Container";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Form from "../../../Components/Dashboard/Form";
import useLoadDistricts from "../../../hooks/useLoadDistricts";
import useLoadUpazilas from "../../../hooks/useLoadUpazilas";

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
            <div className="">
              <div className="text-center">
                <h2 className="text-lg ">
                  <span className="font-medium">Name:</span> {userData?.name}
                </h2>
                <h2 className="text-lg">
                  <span className="font-medium">Email:</span> {user?.email}
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
