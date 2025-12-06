import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialGoogleLogin from "../SocialLogin/SocailGoogleLogin";


const Login = () => {
  const [eyes, setEyes] = useState(false);
  const [error, setError] = useState("");
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data?.email, data?.password)
      .then((result) => {
        console.log(result);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div>
      <div className=" flex items-center justify-center my-8 md:my-20 p-3.5">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login your account
          </h2>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {/* email  */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered w-full pl-10"
                />
                {/* errors  */}
                {errors.register && (
                  <span className="font-light text-red-600">
                    This field is required
                  </span>
                )}
                <FiMail className="absolute top-3.5 left-3 z-1  text-gray-400" />
              </div>
            </div>
            {/* password  */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={eyes ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10"
                  required
                />
                {/* errors  */}
                {errors.password && (
                  <span className="font-light text-red-600">
                    This field is required
                  </span>
                )}
                <FiLock className="absolute top-3.5 left-3 z-1  text-gray-400" />
                <button type="button" onClick={() => setEyes(!eyes)}>
                  {eyes ? (
                    <FaRegEye className="absolute right-6 top-3 z-1" />
                  ) : (
                    <FaRegEyeSlash className="absolute right-6 top-3 z-1" />
                  )}
                </button>
                <div>
                  <Link to={"/resetPassword"} className="link link-hover">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
            {/* error  */}
            {error && <h2 className="text-red-600">{error}</h2>}
            <button
              type="submit"
              className="btn btn-block bg-black text-white hover:bg-gray-800"
            >
              Login
            </button>
          </form>
          {/* google sign in */}
          <div>
            <SocialGoogleLogin linkTOGo={location?.state} />
          </div>
          <h2>
            Have an account? Please{" "}
            <Link
              to={"/register"}
              className=" btn-link tex-lg font-medium text-accent"
              state={location?.state}
            >
              Sign Up
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;