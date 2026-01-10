import { Outlet, useNavigation } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import Loader from "../Components/Shared/Loader";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const navigation = useNavigation();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading || navigation?.state === "loading") {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <Navbar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
