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
import UpdateDonarReqData from "../Pages/Dashboard/UpdateDonarReqData/UpdateDonarReqData";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import DetailsDonarReqData from "../Pages/Dashboard/MyDonationRequests/DetailsDonarReqData/DetailsDonarReqData";

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
      {
        index: true,
        Component: DonarHome,
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
        // loader: ({ params }) =>
        //   fetch(`http://localhost:9000/create-donation-request/${params?.id}`),
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
    ],
  },
]);

export default router;
