import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Header from "./Header";

function Cart(props) {
    // Initialize the quantity state based on the backend data
    const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        // Initialize quantities based on the backend data (props.cartData)
        const initialQuantities = props.cartData.map(item => ({
            id: item.id,
            quantity: item.quantity || 1, // Use quantity from backend or default to 1
        }));
        setQuantities(initialQuantities);
        console.log(props.cartData)
    }, [props.cartData]);

    // Update the quantity for a specific item
    function handleQuantityChange(itemId, operation) {
        setQuantities((prevQuantities)=> {
            return prevQuantities.map((qty)=> {
                if (qty.id === itemId) {
                    const newQuantity = operation === "increment" ? qty.quantity + 1 : qty.quantity - 1;
                    props.updateCart(itemId, newQuantity)
                    return {
                        ...qty,
                        quantity: Math.max(newQuantity, 1), // Ensure quantity is at least 1
                    };
                }
                return qty;
            });
        });
    }

    // Calculate the total price using the updated quantities
    const totalPrice = props.cartData.reduce((sum, item) => {
        const quantity = quantities.find(qty => qty.id === item.id)?.quantity || 1;
        return sum + item.price * quantity;
    }, 0);

    return (
        <>
            <Header cartLength={props.cartLength} searchName={props.searchName} productdes={props.productdes}/>

            <div className="bg-slate-100 min-h-screen p-4 lg:p-8 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/4">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-700 mb-6 lg:mb-8">Your Cart</h1>
                    {props.cartLength > 0 ? (
                        <div className="flex flex-col space-y-6">
                            {props.cartData.map((data, index) => {
                                const itemQuantity = quantities.find(qty => qty.id === data.id)?.quantity || 1;

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col lg:flex-row items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow space-y-4 lg:space-y-0"
                                    >
                                        <div className="flex items-center space-x-4 w-full lg:w-auto">
                                            <div className="w-24 h-24">
                                                <img
                                                    src={data.imageurl}
                                                    alt="product"
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div className="flex-1 lg:flex-none ">
                                                <p className="text-lg font-semibold text-gray-800">{data.name}</p>
                                                <p className="text-gray-600">Price: rs {data.price}</p>
                                                <div className="flex items-center space-x-4 mt-2">
                                                    <button
                                                        className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition"
                                                        onClick={() => handleQuantityChange(data.id, "increment")}
                                                    >
                                                        +
                                                    </button>
                                                    <p id="quantityData" className="text-lg font-semibold">{itemQuantity}</p>
                                                    <button
                                                        className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-600 transition"
                                                        onClick={() => handleQuantityChange(data.id, "decrement")}
                                                    >
                                                        -
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                            onClick={() => props.RemoveFromCart(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-lg mt-10">
                            Your cart is empty.
                        </div>
                    )}
                </div>

                {/* Total Price & Checkout */}
                {props.cartLength > 0 && (
                    <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg self-start lg:h-1/2">
                        <h2 className="text-lg lg:text-xl font-bold text-gray-700 mb-4">Summary</h2>
                        <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                            <span>Total Price:</span>
                            <span>Rs {totalPrice}</span>
                        </div>
                        <button
                            className="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            <Link to="/checkout">Proceed to Checkout</Link>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

Cart.propTypes = {
     updateCart:PropTypes.func.isRequired,  
     AddToCart:PropTypes.func.isRequired,  
      searchName:PropTypes.func.isRequired,
      productdes: PropTypes.func.isRequired,
    cartData: PropTypes.arrayOf(
        PropTypes.shape({
            imageurl: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            quantity: PropTypes.number, 
        })
    ).isRequired,
    cartLength: PropTypes.number.isRequired,
    RemoveFromCart: PropTypes.func.isRequired,
};

export default Cart;
