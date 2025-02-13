import { useContext, useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import auth from "../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userContext } from "./context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [message,setMessage] = useState({
    text:"",
    type:""
})
const [isLoading,setIsLoading] = useState(false)


const navigate = useNavigate()

const loggedInData = useContext(userContext)


useEffect(()=>{  
  auth.onAuthStateChanged((user)=>{
    if(user && user.uid == "SVO2moOwqHeuq1tMrsGyYLRl1j52"){
        // navigate("/admin")
    }
    else{
        console.log("logged out")
    }
  })
},[navigate])

function handleLogin(e){
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth,email,password).then((userCreds)=>{
        const user = userCreds.user
        const usercredentials = {
            id:user.uid,
            name:user.displayName,
            email:user.email,
        }
        console.log(usercredentials)
        localStorage.setItem("amazon",JSON.stringify(usercredentials))
        loggedInData.setloggedUser(usercredentials)
        if(user.uid === "SVO2moOwqHeuq1tMrsGyYLRl1j52"){
            navigate("/admin")
        }
        else{
            navigate("/")
        }   
    }).catch((err)=>{
        setMessage({type:"error",text:err.message})
    }).finally(()=>{
        setIsLoading(false)
    })
}

    return(
        <>
        <div className="bg-white h-screen w-full flex flex-col pt-24 p-5 lg:p-0 items-center lg:pt-10">
           <img src="./amazon-logo2.png" className="h-20"></img>
           <div className="w-full max-w-md bg-white border border-black p-4">
           <form >
            <h1 className="font-bold text-2xl text-center">Sign in Your Account</h1>
            <div className="flex flex-col gap-3 pt-4">
            <input name="email"  type="email" className="p-2 border border-black outline-none" placeholder="enter your email" required onChange={(e)=>{setEmail(e.target.value)}} autoComplete="off"></input>
            <div className="flex border border-black">
            <input id="password" name="password" type="password" className="p-2 outline-none w-[80%]" placeholder="enter your password" required onChange={(e)=>{setPassword(e.target.value)}} autoComplete="off"></input>
            <button type="button" className="p-2 bg-gray-300 cursor-pointer border-l border-black w-[20%]" onMouseDown={(e)=>{ 
                e.preventDefault()
                document.getElementById("password").type = "text"
            }} onMouseUp={(e)=>{
                e.preventDefault()
                document.getElementById("password").type = "password"
            }} onTouchStart={(e)=>{ 
                e.preventDefault()
                document.getElementById("password").type = "text"
            }} onTouchEnd={(e)=>{
                e.preventDefault()
                document.getElementById("password").type = "password"
            }}><FontAwesomeIcon icon={faEye} /></button>
            </div>
            <div className="flex flex-col gap-3 items-center mt-1">
            <button className="p-2 bg-yellow-400 w-[50%] font-semibold cursor-pointer" onClick={handleLogin}>{isLoading ? "LOADING..." : "SIGN IN"}</button>
            <p>DONT HAVE AN ACCOUNT?<span className="font-bold"> <Link to="/register">REGISTER</Link> </span></p>
            <p className={`${message.type} p-2 px-4 mt-2 font-medium text-lg `}>{message.text}</p>
            </div>
            </div>
           </form>
           </div>
        </div>
        </>
    )
}

export default Login;