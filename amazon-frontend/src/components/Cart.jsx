import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Header from "./Header";



function Cart(props) {
    const [quantities, setQuantities] = useState([]);

    useEffect(() => {
        const initialQuantities = props.cartData.map(item => ({
            id: item.id,
            quantity: item.quantity || 1,
            stock: item.stock
        }));
        setQuantities(initialQuantities);
    }, [props.cartData]);

    function handleQuantityChange(itemId, operation) {
        setQuantities(prevQuantities =>
            prevQuantities.map(qty => {
                if (qty.id === itemId) {
                    let newQuantity = operation === "increment"
                        ? Math.min(qty.quantity + 1, qty.stock)
                        : Math.max(qty.quantity - 1, 1);

                    props.updateCart(itemId, newQuantity);
                    return { ...qty, quantity: newQuantity };
                }
                return qty;
            })
        );
    }

    const totalPrice = props.cartData.reduce((sum, item) => {
        const quantity = quantities.find(qty => qty.id === item.id)?.quantity || 1;
        return sum + item.price * quantity;
    }, 0);

    const isSizeMissing = props.cartData.some(item => item.category === "Clothing" && !item.selectedSize);

    return (
        <>
            <Header cartLength={props.cartLength} searchName={props.searchName} productdes={props.productdes} />

            <div className="bg-gray-100 min-h-screen p-6 lg:p-12 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-3/4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

                    {props.cartLength > 0 ? (
                        <div className="flex flex-col space-y-6">
                            {props.cartData.map((data, index) => {
                                const itemQuantity = quantities.find(qty => qty.id === data.id)?.quantity || 1;

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col lg:flex-row items-center justify-between p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow space-y-4 lg:space-y-0"
                                    >
                                        <div className="flex items-center space-x-6 w-full lg:w-auto">
                                            <img
                                                src={data.imageurl}
                                                alt={data.name}
                                                className="w-24 h-32 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <p className="text-lg font-semibold text-gray-800 cursor-pointer" onClick={()=> props.productdes(data)}><Link to="/productdescription">{data.name}</Link></p>
                                                <p className="text-gray-600">Price: Rs {data.price}</p>

                                                <div className="flex items-center space-x-4 mt-3">
                                                    <button
                                                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                                                        onClick={() => handleQuantityChange(data.id, "decrement")}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-lg font-semibold">{itemQuantity}</span>
                                                    <button
                                                        className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                                                        onClick={() => handleQuantityChange(data.id, "increment")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                

                                                {data.category === "Clothing" && (
                                                    <div className="mt-3  lg:w-[50%] md:w-[40%] w-[90%]  grid lg:grid-cols-4 grid-cols-2 gap-2">
                                                        {data.sizes.map(size => (
                                                            <button
                                                                key={size}
                                                                className={`px-4 py-2 text-sm rounded-lg transition cursor-pointer ${
                                                                    data.selectedSize === size
                                                                        ? "bg-blue-500 text-white"
                                                                        : "bg-gray-200 text-gray-700"
                                                                }`}
                                                                onClick={() => props.updateCartSize(data.id, size)}
                                                            >
                                                                {size}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="mt-2 text-red-500 font-semibold animate-pulse">
                                                <p>available stock : {data.stock}</p>
                                                </div>
                                            </div>
                                            
                                        </div>

                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition"
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

                {/* Checkout Section */}
                {props.cartLength > 0 && (
                    <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md self-start">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Summary</h2>

                        <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
                            <span>Total Price:</span>
                            <span>Rs {totalPrice}</span>
                        </div>

                        <button
                            disabled={isSizeMissing}
                            className={`w-full mt-6 px-6 py-3 text-white rounded-lg transition ${
                                isSizeMissing ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            <Link to={isSizeMissing ? "#" : "/checkout"}>Proceed to Checkout</Link>
                        </button>

                        {isSizeMissing && (
                            <p className="text-red-500 text-sm mt-2 text-center">
                                Please select a size before proceeding.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}




Cart.propTypes = {
    updateCartSize:PropTypes.func.isRequired,  
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
