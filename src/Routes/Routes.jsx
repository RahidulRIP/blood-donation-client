import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Loader from "../Components/Shared/Loader";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback: Loader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        Component: Register,
        loader: async () => {
          const [districtsRes, upazilasRes] = await Promise.all([
            fetch("../../public/districts.json"),
            fetch("../../public/upazilas.json"),
          ]);
          const districts = await districtsRes.json();
          const upazilas = await upazilasRes.json();

          return { districts, upazilas };
        },
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "profile",
        index: true,
        Component: MyProfile,
      },
    ],
  },
]);

export default router;
