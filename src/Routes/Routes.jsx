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
import SearchPage from "../Pages/Home/SearchPage/SearchPage";
import DonationRequestPublic from "../Pages/Home/DonationRequestPublic/DonationRequestPublic";
import DonateBlood from "../Pages/Home/DonateBlood/DonateBlood";
import FundingPage from "../Pages/Home/FundingPage/FundingPage";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import RoutesErrorPage from "./RoutesErrorPage";
import PrivateRouteAdmin from "./PrivateRouteAdmin";
import AdminVolunteerPrivate from "./adminVolunteerPrivate";
import MissionStory from "../Pages/Home/Home/components/MissionStory";
import NutritionGuide from "../Pages/Home/Home/components/NutritionGuide";
import RareBloodImpact from "../Pages/Home/Home/components/RareBloodImpact";
import SavingLives from "../Pages/Home/Home/components/SavingLives";
import SuccessStories from "../Pages/Home/Home/components/SuccessStories";
import AboutUs from "../Pages/Shared/Footer/Components/AboutUs";
import TermsOfUse from "../Pages/Shared/Footer/Components/TermsOfUse";
import PrivacyPolicy from "../Pages/Shared/Footer/Components/PrivacyPolicy";
import CookiePolicy from "../Pages/Shared/Footer/Components/CookiePolicy";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
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
      {
        path: "about",
        element: <MissionStory />,
      },
      {
        path: "blog/nutrition-guide",
        element: <NutritionGuide />,
      },
      {
        path: "blog/rare-blood-impact",
        element: <RareBloodImpact />,
      },
      {
        path: "blog/saving-lives",
        element: <SavingLives />,
      },
      {
        path: "success-stories",
        element: <SuccessStories />,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "terms-use",
        Component: TermsOfUse,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "cookie-policy",
        Component: CookiePolicy
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
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
        element: (
          <PrivateRoute>
            <CreateDonationRequest />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRouteAdmin>
            <AllUsers />
          </PrivateRouteAdmin>
        ),
      },
      {
        path: "all-blood-donation-request",
        // this use in admin and volunteer i think
        // Component: AllBloodDonationRequest,
        element: (
          <AdminVolunteerPrivate>
            <AllBloodDonationRequest />
          </AdminVolunteerPrivate>
        ),
      },
      // admin dashboard end

      // volunteer dashboard stat
      {
        index: true,
        // Component: VolunteerHome,
        element: (
          <AdminVolunteerPrivate>
            <VolunteerHome />
          </AdminVolunteerPrivate>
        ),
      },
      // volunteer dashboard end

      // payment component start
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      // payment component end
    ],
  },
  {
    path: "*",
    Component: RoutesErrorPage,
  },
]);

export default router;
