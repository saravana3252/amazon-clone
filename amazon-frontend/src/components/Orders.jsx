import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { userContext } from "./context/userContext";
import PropTypes from "prop-types";

function Orders(props) {
  const loggedInData = useContext(userContext);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://amazon-clone-backend-mxip.onrender.com/orders/${loggedInData.loggedUser.id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUserOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch orders. Please try again later." + err);
        setLoading(false);
      });
  }, [loggedInData.loggedUser.id]);

  return (
    <>
      <Header
        cartLength={props.cartLength}
        searchName={props.searchName}
        productdes={props.productdes}
      />
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🛍️ Your Orders
        </h2>

        {loading && <p className="text-center text-lg text-gray-600">Loading orders...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && userOrders.length === 0 && (
          <p className="text-center text-lg text-gray-600">No orders found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-2.5 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-700 border-b pb-2">
                Order #{index + 1}
              </h3>

            
              <div className="mt-3 text-sm text-gray-600 space-y-2">
                <p>
                  <strong>👤 Placed by:</strong> {order.userName}
                </p>
                <p>
                  <strong>💰 Total Amount:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    ₹{order.totalAmount}
                  </span>
                </p>
                <p>
                  <strong>💳 Payment:</strong> {order.paymentMethod}{" "}
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-lg ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
                <p>
                  <strong>📦 Order Status:</strong>{" "}
                  <span className="px-3 py-1 text-xs font-medium bg-blue-200 text-blue-800 rounded-lg">
                    {order.orderStatus}
                  </span>
                </p>
              </div>

              
              <h4 className="mt-4 font-semibold text-gray-700">🛒 Products:</h4>
              <div className="overflow-x-auto mt-2 flex ">
                <table className="w-full border-collapse border text-sm ">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="border p-2">Product</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Quantity</th>
                      <th className="border p-2">Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartData.map((product, i) => (
                      <tr key={i} className="border-b text-center">
                        <td className="border p-2">{product.productName}</td>
                        <td className="border p-2">₹{product.price}</td>
                        <td className="border p-2">{product.quantity}</td>
                        <td className="border p-2">{product.selectedSize || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Orders.propTypes = {
  searchName: PropTypes.func.isRequired,
  productdes: PropTypes.func.isRequired,
  AddToCart: PropTypes.func.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default Orders;
