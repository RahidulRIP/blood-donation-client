import Container from "../../../Components/Container/Container";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
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
                  <span className="font-medium">Name</span> {user?.displayName}
                </h2>
                <h2 className="text-lg">
                  <span className="font-medium">Email:</span> {user?.email}
                </h2>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default MyProfile;
