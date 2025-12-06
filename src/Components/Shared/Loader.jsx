import { Vortex } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 items-center justify-center">
      <div className="">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    </div>
  );
};

export default Loader;
