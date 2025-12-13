import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaHome } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";

const PaymentSuccess = () => {
  const [paymentInformation, setPaymentInformation] = useState();
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const called = useRef(false);

  const session_id = searchParams.get("session_id");
  // console.log(session_id);

  useEffect(() => {
    if (!session_id || called.current) return;
    called.current = true;

    if (session_id) {
      axiosSecure
        .post(`/payment-success/?session_id=${session_id}`)
        .then((res) => {
          if (res?.data?.transactionId) {
            setPaymentInformation(res?.data?.transactionId);
            console.log(res);
            if (res?.data?.transactionId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Payment successful!",
                showConfirmButton: false,
                timer: 2500,
              });
              // navigate("/funding-page");
            }
          }
        });
    }
  }, [session_id, axiosSecure]);

  return (
    <div>
      <h2 className="font-bold text-2xl text-center md:flex items-center justify-center min-h-screen md:-mt-40">
        Payment Successful.Your transaction id is :
        <span className="text-green-500 font-medium text-xl">
          {" "}
          {paymentInformation}
        </span>
      </h2>
      <div className="w-full p-4 md:flex md:justify-around space-y-4 md:space-y-0 md:space-x-4">
        {/* Go Home Button */}
        <Link to={"/"} className="w-full">
          <button className="btn btn-lg btn-primary text-black w-full">
            <FaHome className="w-6 h-6 mr-2" />
            Go Home
          </button>
        </Link>

        {/* Payment Info Button*/}
        <Link to={"/funding-page"} className="w-full">
          <button className="btn btn-lg btn-secondary w-full">
            <FaCreditCard className="w-6 h-6 mr-2" />
            Payment Info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
