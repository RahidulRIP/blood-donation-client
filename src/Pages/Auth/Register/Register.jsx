import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialGoogleLogin from "../SocialLogin/SocailGoogleLogin";
import Container from "../../../Components/Container/Container";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [eyes, setEyes] = useState(false);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleRegister = async (data) => {
    // register a user
    createUser(data?.email, data?.password)
      .then(() => {
        // console.log(result.user);

        // upload photo using api in imgBB start
        const file = data.photo[0];
        const formData = new FormData();
        formData.append("image", file);
        const apiKey = import.meta.env.VITE_ImgBB_api;
        const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        try {
          axiosSecure.post(url, formData).then((res) => {
            const imgURL = res?.data?.data?.display_url;

            const profile = {
              displayName: data?.name,
              photoURL: imgURL,
            };
            console.log(profile);
            // update user profile
            updateUserProfile(profile)
              .then(() => {
                // console.log(result);
                navigate(location?.state || "/");
              })
              .catch((err) => {
                setError(err.message);
              });
          });
        } catch (err) {
          console.log(err);
        }
        // upload photo using api in imgBB end
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <Container>
      <div className="flex items-center justify-center my-12 md:my-16 p-3.5">
        <div className="w-full  p-8 space-y-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Register your account
          </h2>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <section className="md:flex gap-28">
              <section className="flex-1 space-y-6">
                {/* name  */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="Enter your name"
                      className="input input-bordered w-full pl-10 outline-none"
                      required
                    />
                    <FiUser className="absolute top-3.5 left-3 z-1  text-gray-400" />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      Name is required
                    </p>
                  )}
                </div>
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
                      required
                    />
                    <FiMail className="absolute top-3.5 left-3 z-1  text-gray-400" />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Email is required
                    </p>
                  )}
                </div>
                {/* photo  file*/}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Photo
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full"
                      {...register("photo", { required: true })}
                    />
                    <FiImage className="absolute top-3.5 right-5 z-1 text-gray-400" />
                  </div>

                  {errors.photo && (
                    <p className="text-red-500 text-sm mt-1">
                      Photo is required
                    </p>
                  )}
                </div>
                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    defaultValue="Select blood group"
                    {...register("blood_groups", {
                      required: "Select your blood group",
                    })}
                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option disabled>Select blood group</option>

                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  {errors.blood_groups && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.blood_group.message}
                    </p>
                  )}
                </div>
              </section>
              <section className="flex-1 space-y-6">
                {/* District */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    District
                  </label>
                  <select
                    defaultValue="Select district"
                    {...register("district", {
                      required: "Select your district",
                    })}
                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option disabled>Select district</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Khulna">Khulna</option>
                  </select>
                  {errors.district && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>
                {/* upazila  */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Upazila
                  </label>
                  <select
                    defaultValue="Select upazila"
                    {...register("upazila", {
                      required: "Select your upazila",
                    })}
                    className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option disabled>Select upazila</option>
                    <option value="Savar">Savar</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                    <option value="Khulna Sadar">Khulna Sadar</option>
                  </select>
                  {errors.upazila && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.upazila.message}
                    </p>
                  )}
                </div>

                {/* password  */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                          message:
                            "Must be 6+ chars and include letters, numbers & special characters",
                        },
                      })}
                      type={eyes ? "text" : "password"}
                      placeholder="Enter your password"
                      className="input input-bordered w-full pl-10"
                    />
                    {/* errors  */}
                    {errors.password && (
                      <p className="text-red-500 text-sm pt-1.5">
                        {errors.password.message}
                      </p>
                    )}
                    <FiLock className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    <button type="button" onClick={() => setEyes(!eyes)}>
                      {eyes ? (
                        <FaRegEye className="absolute right-6 top-3 z-1" />
                      ) : (
                        <FaRegEyeSlash className="absolute right-6 top-3 z-1" />
                      )}
                    </button>
                  </div>
                </div>

                {/* confirm Password  */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("confirm_password", {
                        required: "confirm_password is required",
                      })}
                      type={eyes ? "text" : "password"}
                      placeholder="Re-enter your password"
                      className="input input-bordered w-full pl-10"
                    />
                    <FiLock className="absolute top-3.5 left-3 z-1  text-gray-400" />
                    <button type="button" onClick={() => setEyes(!eyes)}>
                      {eyes ? (
                        <FaRegEye className="absolute right-6 top-3 z-1" />
                      ) : (
                        <FaRegEyeSlash className="absolute right-6 top-3 z-1" />
                      )}
                    </button>
                  </div>
                </div>
              </section>
            </section>
            {/* checkBox  */}
            <div className="flex items-center gap-2">
              <input
                name="terms"
                type="checkbox"
                className="checkbox checkbox-sm"
              />
              <h2 className="text-sm text-gray-700">
                Accept Terms & Conditions
              </h2>
            </div>
            {/* error  */}
            {error && <h2 className="text-red-600">{error}</h2>}
            <button type="submit" className="btn_primary">
              Register
            </button>
          </form>
          <div>
            <SocialGoogleLogin />
          </div>

          <h2>
            Have an account? Please
            <Link
              to={"/login"}
              className=" btn-link tex-lg font-medium text-accent"
            >
              Sign In
            </Link>
          </h2>
        </div>
      </div>
    </Container>
  );
};

export default Register;
