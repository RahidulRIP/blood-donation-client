import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Loader from "../Components/Shared/Loader";
import PrivateRoute from "./PrivateRoute";
import DonarHome from "../Pages/Dashboard/DonarDashboard/DonarHome/DonarHome";
import CreateDonationRequest from "../Pages/Dashboard/DonarDashboard/Pages/CreateDonationRequest/CreateDonationRequest";
import UpdateDonarReqData from "../Pages/Dashboard/DonarDashboard/Pages/UpdateDonarReqData/UpdateDonarReqData";
import MyDonationRequests from "../Pages/Dashboard/DonarDashboard/Pages/MyDonationRequests/MyDonationRequests";
import DetailsDonarReqData from "../Pages/Dashboard/DonarDashboard/Pages/DetailsDonarReqData/DetailsDonarReqData";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import DashboardRoleBasedPage from "../Components/Dashboard/DashboardRoleBasedPage";

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
            fetch("/districts.json"),
            fetch("/upazilas.json"),
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
      // donar dashboard start
      {
        index: true,
        Component: () => <DashboardRoleBasedPage />,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationRequests,
      },
      {
        path: "profile",
        index: true,
        Component: MyProfile,
        loader: async () => {
          const [districtsRes, upazilasRes] = await Promise.all([
            fetch("/districts.json"),
            fetch("/upazilas.json"),
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
            fetch("/districts.json"),
            fetch("/upazilas.json"),
          ]);
          const districts = await districtsRes.json();
          const upazilas = await upazilasRes.json();

          return { districts, upazilas };
        },
      },
      {
        path: "updateDonarReqData/:id",
        Component: UpdateDonarReqData,
        loader: async () => {
          const [districtsRes, upazilasRes] = await Promise.all([
            fetch("/districts.json"),
            fetch("/upazilas.json"),
          ]);
          const districts = await districtsRes.json();
          const upazilas = await upazilasRes.json();

          return { districts, upazilas };
        },
      },
      {
        path: "detailsDonarReqData/:id",
        Component: DetailsDonarReqData,
      },
      // donar dashboard end

      // admin dashboard start
      {
        index: true,
        Component: AdminHome,
      },
      // admin dashboard end
    ],
  },
]);

export default router;
