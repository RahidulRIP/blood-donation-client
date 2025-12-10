import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [paymentInformation, setPaymentInformation] = useState();
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const session_id = searchParams.get("session_id");
  console.log(session_id);

  useEffect(() => {
    if (session_id) {
      try {
        axiosSecure
          .post(`/payment-success/?session_id=${session_id}`)
          .then((res) => {
            if (res?.data?.transactionId) {
              setPaymentInformation(res?.data?.transactionId);
              navigate("/funding-page");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment successful!",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [axiosSecure, session_id, navigate]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-center md:flex items-center justify-center min-h-screen md:-mt-40">
        Payment Successful.Your transaction id is :
        <span className="text-green-500 font-medium text-xl">
          {" "}
          {paymentInformation}
        </span>
      </h2>
    </div>
  );
};

export default PaymentSuccess;
