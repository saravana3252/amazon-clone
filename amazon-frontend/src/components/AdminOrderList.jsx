import { useState, useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { userContext } from "./context/userContext";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingIndex, setIsEditingIndex] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  // const loggedIndata = useContext(userContext);

  
  function fetchOrders() {
    fetch("https://amazon-clone-backend-mxip.onrender.com/checkout")
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  
  function toggleEditing(index) {
    setIsEditingIndex(index);
    setPaymentStatus(orders[index].paymentStatus);
    setOrderStatus(orders[index].orderStatus);
  }


  function toggleEditingCancel() {
    setIsEditingIndex(null);
    setPaymentStatus("");
    setOrderStatus("");
  }

  
  function handleUpdate(orderId) {
    if (!paymentStatus && !orderStatus) {
      toast.warning("Please enter a status to update!");
      return;
    }

    const updates = [];

    if (paymentStatus) {
      updates.push(
        fetch(`https://amazon-clone-backend-mxip.onrender.com/updatepaymentstatus/${orderId}/${paymentStatus}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        })
      );
    }

    if (orderStatus) {
      updates.push(
        fetch(`https://amazon-clone-backend-mxip.onrender.com/updateorderstatus/${orderId}/${orderStatus}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        })
      );
    }

   
    Promise.all(updates)
      .then(() => {
        toast.success("Order updated successfully!");
        setIsEditingIndex(null);
        fetchOrders(); 
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          🛒 Order List
        </h1>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow-md border">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                   Order 🆔: <span className="text-gray-900">{order._id}</span>
                </h3>

               
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <p><strong>👤 User:</strong> {order.userName} (ID: {order.userId})</p>
                  <p><strong>💳 Payment:</strong> {order.paymentMethod}</p>
                </div>

                <p className="mt-2"><strong>💰 Total Amount:</strong> <span className="text-green-600 font-semibold">₹{order.totalAmount}</span></p>

                
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-700">🛍️ Cart Items</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border mt-2 text-sm">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="border p-2">Product</th>
                          <th className="border p-2">Price</th>
                          <th className="border p-2">Quantity</th>
                          <th className="border p-2">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cartData.map((item) => (
                          <tr key={item.productId} className="border-b text-center">
                            <td className="border p-2">{item.productName}</td>
                            <td className="border p-2">${item.price}</td>
                            <td className="border p-2">{item.quantity}</td>
                            <td className="border p-2">{item.selectedSize || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

               
                <div className="grid grid-cols-2 gap-4 mt-4">
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">💰 Payment Status</h3>
                    {isEditingIndex === index ? (
                      <input
                        type="text"
                        className="border p-2 w-full rounded"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                      />
                    ) : (
                      <span className={`px-3 py-1 text-sm font-medium rounded-lg ${order.paymentStatus === "Paid" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {order.paymentStatus}
                      </span>
                    )}
                  </div>

                 
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">📦 Order Status</h3>
                    {isEditingIndex === index ? (
                      <input
                        type="text"
                        className="border p-2 w-full rounded"
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                      />
                    ) : (
                      <span className="px-3 py-1 text-sm font-medium bg-blue-200 text-blue-800 rounded-lg">
                        {order.orderStatus}
                      </span>
                    )}
                  </div>
                </div>

             
                <div className="mt-4 flex gap-3">
                  {isEditingIndex === index ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        onClick={() => handleUpdate(order._id)}
                      >
                        ✅ Update
                      </button>
                      <button
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                        onClick={toggleEditingCancel}
                      >
                        ❌ Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => toggleEditing(index)}
                    >
                      ✏️ Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default OrderList;
