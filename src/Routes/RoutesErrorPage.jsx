import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router";

const RoutesErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-3.5 items-center justify-center">
      <div className="min-h-screen flex flex-col gap-3.5 items-center justify-center">
        <MdErrorOutline size={65} className="text-red-600" />
        <h2 className="text-6xl font-bold">404</h2>
        <h5 className="text-2xl font-medium">Not Found</h5>
        <p className="text-center">
          Sorry,the page you are looking for might be removed,renamed,or is
          temporarily unavailable{" "}
        </p>
        <div className="flex items-center justify-center gap-3.5">
          <Link to={"/"}>
            <button className="btn bg-btn_primary text-black  text-lg">
              Back to Home
            </button>
          </Link>
          <Link to={"/search-page"}>
            <button className="btn btn_primary text-lg">Search Donor</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoutesErrorPage;
