import { Link } from "react-router-dom";

function PaymentCancel() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-gray-800">
            {/* Cancel Icon */}
            <div className="mb-8">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    className="w-20 h-20 text-red-500"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M6 18L18 6M6 6l12 12" 
                    />
                </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
            <p className="text-lg text-gray-600 mb-6 text-center">Your payment was cancelled. Please try again or continue shopping.</p>

            {/* Buttons */}
            <div className="flex space-x-4">
                <Link 
                    to="/checkout"
                    className="px-3 lg:px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded shadow hover:bg-red-600 transition duration-300"
                >
                    Retry Payment
                </Link>
                <Link 
                    to="/"
                    className="px-3 lg:px-6 py-3 bg-gray-200 text-gray-800 text-lg font-semibold rounded shadow hover:bg-gray-300 transition duration-300"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}

export default PaymentCancel;
