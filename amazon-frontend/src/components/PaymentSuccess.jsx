import { Link } from "react-router-dom";

function PaymentSuccess() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-gray-800">
            {/* Success Icon */}
            <div className="mb-8">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor" 
                    className="w-20 h-20 text-green-500"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M9 12l2 2 4-4m5-3a9 9 0 11-6 15.9A9 9 0 0114 3z" 
                    />
                </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-6 text-center">Thank you for your purchase. Your order is being processed.</p>

            {/* Continue Shopping Button */}
            <Link 
                to="/"
                className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded shadow hover:bg-green-600 transition duration-300"
            >
                Continue Shopping
            </Link>
        </div>
    );
}

export default PaymentSuccess;
