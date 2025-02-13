import { useContext } from "react"
import { userContext } from "./context/userContext"
import { Navigate } from "react-router-dom"

function PrivateCheckout(props){

    const loggedInData =useContext(userContext)
    const {Component,...rest,cartData} = props

    return (
        <>
        {
           loggedInData.loggedUser !== null && cartData.length > 0 ? (<Component {...rest} ></Component>):(<Navigate to="/"></Navigate>)
        }
        
        </>
    )
}

export default PrivateCheckout