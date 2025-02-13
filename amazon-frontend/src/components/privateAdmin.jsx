import { useContext } from "react"
import { userContext } from "./context/userContext"
import { Navigate } from "react-router-dom"
import PropTypes from 'prop-types';


function PrivateAdmin(props){

    const loggedInData =useContext(userContext)
    const {Component,...rest} = props

    return (
        <>
        {
           loggedInData.loggedUser !== null && loggedInData.loggedUser.id ==="SVO2moOwqHeuq1tMrsGyYLRl1j52" ? (<Component {...rest} ></Component>):(<Navigate to="/"></Navigate>)
        }
        
        </>
    )
}

PrivateAdmin.propTypes = {
    Component: PropTypes.elementType.isRequired,
};


export default PrivateAdmin