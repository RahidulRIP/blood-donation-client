import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const SocialGoogleLogin = ({ linkTOGo }) => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  console.log(linkTOGo);

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result?.user);
        navigate(linkTOGo || "/");
      })
      .catch((err) => {
        console.log(err?.message);
      });
  };

  return (
    <div>
      <p className="text-center pb-3 font-medium">Or</p>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full gap-2 border-gray-300 hover:bg-gray-100"
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialGoogleLogin;
