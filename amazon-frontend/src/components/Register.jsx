import { useState } from "react";
import {Link} from "react-router-dom"
import auth from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Register(){

    const [name,setName] =useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [message,setMessage] = useState({
        type:"",
        text:""
    })
    const [isLoading,setIsLoading] =useState(false)

    function handleRegister(e) {
        e.preventDefault();
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                const user = userCred.user;
                updateProfile(user, { displayName: name })
                    .then(() => {
                        console.log("User profile updated successfully!");
                        setMessage({type:"success",text:"Registered successfully"})
                        setName("")
                        setEmail("")
                        setPassword("")
                        console.log("User Name:", user.displayName);
                        setTimeout(()=>{
                            setMessage({type:"invisible",text:"dummy text"})
                        },4000)
                    })
                    .catch((error) => {
                        setMessage({type:"error",text:error.message})
                        console.error("Error updating displayName:", error.message);
                    });
            })
            .catch((error) => {
                setMessage({type:"error",text:error.message})
                console.error("Error creating user:", error.message);
            }).finally(()=>{
                setIsLoading(false)
            })
    }
    return(
        <>
        <div className="bg-white h-screen w-full flex flex-col items-center pt-20 p-5 lg:p-0 lg:pt-10">
           <img src="./amazon-logo2.png" className="h-20"></img>
           <div className="w-full max-w-md bg-white border border-black p-4">
           <form>
            <h1 className="font-bold text-2xl text-center">Register Your Account</h1>
            <div className="flex flex-col gap-3 pt-4">
            <input name="name" type="text" className="p-2 border border-black outline-none" placeholder="enter your name" required value={name}  onChange={(e)=>{setName(e.target.value)}} autoComplete="off"></input>
            <input name="email" type="email" className="p-2 border border-black outline-none" placeholder="enter your email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="off"></input>
             <div className="flex border border-black">
                        <input id="password" name="password" type="password" className="p-2 outline-none w-[80%]" placeholder="enter your password" value={password} required onChange={(e)=>{setPassword(e.target.value)}}></input>
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
            <button className="p-2 bg-yellow-400 w-[50%] font-semibold cursor-pointer" onClick={handleRegister}>{isLoading ? "Loading..." : "Create Account"}</button>
            <p>HAVE AN ACCOUNT?<span className="font-bold"> <Link to="/login">LOGIN</Link> </span></p>
            <p className={`${message.type} p-2 px-4 mt-2 font-medium text-lg `}>{message.text}</p>
            </div>
            </div>
           </form>
           </div>
        </div>
        </>
    )
}

export default Register;