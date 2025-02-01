import { useContext } from "react"
import { userContext } from "./context/userContext"
import { Navigate } from "react-router-dom"

function Private(props){

    const loggedInData =useContext(userContext)
    const {Component,...rest} = props

    return (
        <>
        {
            loggedInData.loggedUser != null ? (<Component {...rest} ></Component>):(<Navigate to="/login"></Navigate>)
        }
        
        </>
    )
}

export default Private