import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Loader from "../Components/Shared/Loader";
import PrivateRoute from "./PrivateRoute";
import DonarHome from "../Pages/Dashboard/DonarDashboard/DonarHome";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";

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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    HydrateFallback: Loader,
    children: [
      {
        index: true,
        Component: DonarHome,
      },

      {
        path: "profile",
        index: true,
        Component: MyProfile,
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
        path: "create-donation-request",
        Component: CreateDonationRequest,
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
    ],
  },
]);

export default router;
