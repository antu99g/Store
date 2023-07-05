import { Link, useParams } from "react-router-dom";
import { BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

const PaymentStatus: React.FC = () => {
  const { success } = useParams();
  const paymentSuccess = success === "true" ? true : false;

  return (
    <div className="pt-[35vh] flex flex-col items-center">
      {paymentSuccess ? (
        <BsFillCheckCircleFill size={40} className="w-32 text-green-600" />
      ) : (
        <BsFillXCircleFill size={40} className="w-32 text-red-600" />
      )}
      <h1
        className={`mt-5 ${paymentSuccess ? "text-green-600" : "text-red-600"}`}
      >
        {paymentSuccess ? "Payment Successfull" : "Something went wrong"}
      </h1>
      <Link to="/" className="mt-28 text-sm underline text-slate-700">
        Return to Home
      </Link>
    </div>
  );
};

export default PaymentStatus;
