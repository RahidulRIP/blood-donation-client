import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./Routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./Contexts/AuthProvider/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer position="top-center" autoClose={2000} theme="light" />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
