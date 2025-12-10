import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Auth/Register/Register";
import Login from "../Pages/Auth/Login/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import Loader from "../Components/Shared/Loader";
import PrivateRoute from "./PrivateRoute";
import CreateDonationRequest from "../Pages/Dashboard/DonarDashboard/Pages/CreateDonationRequest/CreateDonationRequest";
import UpdateDonarReqData from "../Pages/Dashboard/DonarDashboard/Pages/UpdateDonarReqData/UpdateDonarReqData";
import MyDonationRequests from "../Pages/Dashboard/DonarDashboard/Pages/MyDonationRequests/MyDonationRequests";
import DetailsDonarReqData from "../Pages/Dashboard/DonarDashboard/Pages/DetailsDonarReqData/DetailsDonarReqData";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome/AdminHome";
import DashboardRoleBasedPage from "../Components/Dashboard/DashboardRoleBasedPage";
import AllUsers from "../Pages/Dashboard/AdminDashboard/Pages/AllUsers/AllUsers";
import AllBloodDonationRequest from "../Pages/Dashboard/AdminDashboard/Pages/AllBloodDonationRequest/AllBloodDonationRequest";
import VolunteerHome from "../Pages/Dashboard/VolunteerDashboard/VolunteerHome/VolunteerHome";
import FundingLinks from "../Pages/Home/FundingLinks/FundingLinks";
import SearchPage from "../Pages/Home/SearchPage/SearchPage";
import DonationRequestPublic from "../Pages/Home/DonationRequestPublic/DonationRequestPublic";
import DonateBlood from "../Pages/Home/DonateBlood/DonateBlood";
import FundingPage from "../Pages/Home/FundingPage/FundingPage";

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
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "donation-request-public",
        Component: DonationRequestPublic,
      },
      {
        path: "funding-links",
        element: (
          <PrivateRoute>
            <FundingLinks />
          </PrivateRoute>
        ),
      },
      {
        path: "search-page",
        element: <SearchPage />,
      },
      {
        path: "donate-blood",
        element: (
          <PrivateRoute>
            <DonateBlood />
          </PrivateRoute>
        ),
      },
      {
        path: "funding-page",
        element: (
          <PrivateRoute>
            <FundingPage />
          </PrivateRoute>
        ),
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
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "updateDonarReqData/:id",
        Component: UpdateDonarReqData,
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
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "all-blood-donation-request",
        Component: AllBloodDonationRequest,
      },
      // admin dashboard end

      // volunteer dashboard stat
      {
        index: true,
        Component: VolunteerHome,
      },
      // volunteer dashboard end
    ],
  },
]);

export default router;
