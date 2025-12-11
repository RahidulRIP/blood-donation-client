

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="card w-full max-w-md bg-white dark:bg-gray-800 shadow-xl border border-red-200 dark:border-red-800">
        <div className="card-body items-center text-center p-8">
          {/* <XCircle className="w-16 h-16 text-red-500 mb-4" /> */}
          <h2 className="card-title text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            Payment Cancelled
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            Your payment process has been cancelled or interrupted. No charges
            were made.
          </p>

          <div className="card-actions">
            <button
              className="btn btn-error text-white dark:btn-outline dark:text-red-400"
              onClick={() => window.history.back()}
            >
              Go Back to Previous Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
