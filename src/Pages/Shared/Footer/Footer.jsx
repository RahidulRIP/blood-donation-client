import { FaGithub, FaXTwitter, FaFacebookF, FaYoutube } from "react-icons/fa6";
import Container from "../../../Components/Container/Container";
import Logo from "../../../Components/Shared/Logo";

const Footer = () => {
  return (
    <div className="bg-[#0F0F0F] text-gray-300">
      <Container>
        <footer className="p-10 flex flex-col gap-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-6">
            {/* Brand */}
            <div className="flex items-center flex-wrap gap-4">
              <Logo />
              <div>
                <h2 className="text-2xl font-semibold text-white tracking-wide">
                  BloodLink
                </h2>
                <p className="text-sm text-gray-400">Make a Difference Today</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5 mt-6 md:mt-0">
              <FaGithub
                size={26}
                className="cursor-pointer hover:text-white transition-all duration-200 hover:scale-110"
              />
              <FaXTwitter
                size={26}
                className="cursor-pointer hover:text-white transition-all duration-200 hover:scale-110"
              />
              <FaYoutube
                size={26}
                className="cursor-pointer hover:text-white transition-all duration-200 hover:scale-110"
              />
              <FaFacebookF
                size={26}
                className="cursor-pointer hover:text-white transition-all duration-200 hover:scale-110"
              />
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <h6 className="text-white text-lg font-semibold mb-3">
                Services
              </h6>
              <div className="flex flex-col gap-1 text-gray-400">
                <a className="hover:text-white transition">Find a Donor</a>
                <a className="hover:text-white transition">Request Blood</a>
                <a className="hover:text-white transition">Donor Registration</a>
                <a className="hover:text-white transition">LifeStream</a>
                
              </div>
            </div>

            <div>
              <h6 className="text-white text-lg font-semibold mb-3">Company</h6>
              <div className="flex flex-col gap-1 text-gray-400">
                <a className="hover:text-white transition">About us</a>
                <a className="hover:text-white transition">Contact</a>
                <a className="hover:text-white transition">Jobs</a>
                <a className="hover:text-white transition">Press kit</a>
              </div>
            </div>

            <div>
              <h6 className="text-white text-lg font-semibold mb-3">Legal</h6>
              <div className="flex flex-col gap-1 text-gray-400">
                <a className="hover:text-white transition">Terms of use</a>
                <a className="hover:text-white transition">Privacy policy</a>
                <a className="hover:text-white transition">Cookie policy</a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h6 className="text-white text-lg font-semibold mb-3">
                Newsletter
              </h6>
              <p className="text-gray-400 mb-3">Get the latest updates</p>
              <div>
                <input
                  type="text"
                  placeholder="Your email"
                  className="input input-bordered w-full rounded-l-lg bg-[#1c1c1c] border-gray-700 text-gray-200"
                />
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-center text-gray-500 text-sm pt-5 border-t border-gray-700">
            © {new Date().getFullYear()} BloodLink All rights reserved.
          </p>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
