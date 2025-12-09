import { BiSolidDonateBlood } from "react-icons/bi";
import logo from "../../assets/logoBlood.png";

const Logo = () => {
  return (
    <div>
      <div className="w-52 rounded-sm">
        {/* <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center ">
          <BiSolidDonateBlood className="text-red-600" />
          Bl<span className="text-red-600">oo</span>dLink
        </h2> */}
        <img className="rounded-sm" src={logo} alt="" />
      </div>
    </div>
  );
};

export default Logo;
