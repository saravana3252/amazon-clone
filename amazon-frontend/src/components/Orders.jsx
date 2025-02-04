import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { userContext } from "./context/userContext";

function Orders() {
    const loggedInData = useContext(userContext);
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://amazon-clone-backend-mxip.onrender.com/orders/${loggedInData.loggedUser.id}`)
            .then((res) => res.json())
            .then((data) => {
                setUserOrders(data);
                setLoading(false);
                console.log(userOrders)
            })
            .catch((err) => {
                setError("Failed to fetch orders. Please try again later."+ err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
                {loading && <p>Loading orders...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && userOrders.length === 0 && <p>No orders found.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userOrders.map((order, index) => (
                        <div key={index} className="border p-4 rounded-lg shadow-md bg-white">
                            <h3 className="text-lg font-semibold mb-2">Order #{index + 1}</h3>
                            <p className="text-sm text-gray-600">Placed by: {order.userName}</p>
                            <p className="text-sm text-gray-600">Total Amount: ₹{order.totalAmount}</p>
                            <p className="text-sm text-gray-600">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
                            <h4 className="mt-2 font-semibold">Products:</h4>
                            <ul className="list-disc ml-4">
                                {order.cartData.map((product, i) => (
                                    <>
                                    <li key={i} className="text-sm text-gray-700">{product.productName} - ₹{product.price} x {product.quantity} {product.selectedSize}</li>
                                    </>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Orders;
