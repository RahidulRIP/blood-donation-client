import { Outlet, useNavigation } from "react-router";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useEffect, useState } from "react";
import Loader from "../Components/Shared/Loader";

const RootLayout = () => {
  const navigation = useNavigation();

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
      return () => clearTimeout(timer);
    }, 500);
  }, []);

  if (initialLoading || navigation?.state === "loading") {
    return <Loader />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
