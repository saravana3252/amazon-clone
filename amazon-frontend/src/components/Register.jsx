import { useState } from "react";
import {Link} from "react-router-dom"
import auth from "../config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register(){

    const [name,setName] =useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] =useState("")
    const [message,setMessage] = useState({
        type:"",
        text:""
    })

    function handleRegister(e) {
        e.preventDefault();

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
                    })
                    .catch((error) => {
                        setMessage({type:"error",text:error.message})
                        console.error("Error updating displayName:", error.message);
                    });
            })
            .catch((error) => {
                setMessage({type:"error",text:error.message})
                console.error("Error creating user:", error.message);
            });
    }
    return(
        <>
        <div className="bg-white h-screen w-full flex flex-col items-center pt-10">
           <img src="./amazon-logo2.png" className="h-20"></img>
           <div className="w-full max-w-md bg-white border border-black p-4">
           <form>
            <h1 className="font-bold text-2xl text-center">Register Your Account</h1>
            <div className="flex flex-col gap-3 pt-4">
            <input name="name" type="text" className="p-2 border border-black" placeholder="enter your name" required value={name}  onChange={(e)=>{setName(e.target.value)}}></input>
            <input name="email" type="email" className="p-2 border border-black" placeholder="enter your email" required value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input name="password" type="password" className="p-2 border border-black" placeholder="enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input>
            <div className="flex flex-col gap-3 items-center mt-1">
            <button className="p-2 bg-yellow-400 w-[50%] font-semibold" onClick={handleRegister}>Create Account</button>
            <p>DONT HAVE AN ACCOUNT?<span className="font-bold"> <Link to="/login">LOGIN</Link> </span></p>
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