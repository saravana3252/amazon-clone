import { useContext } from "react"
import { userContext } from "./context/userContext"
import { Navigate } from "react-router-dom"
import PropTypes from 'prop-types';


function PrivateCheckout(props){

    const loggedInData =useContext(userContext)
    const {Component,cartData,...rest} = props

    return (
        <>
        {
           loggedInData.loggedUser !== null && cartData && cartData.length > 0 ? (<Component {...rest} ></Component>):(<Navigate to="/"></Navigate>)
        }
        
        </>
    )
}

PrivateCheckout.propTypes = {
    Component: PropTypes.elementType.isRequired,
    cartData: PropTypes.array.isRequired
};

export default PrivateCheckout
