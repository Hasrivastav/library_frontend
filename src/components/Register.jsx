import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios  from "axios";
import { Context } from '../index';
import toast from "react-hot-toast"

const Register = () => {

    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const {isAuthenticated,setIsAuthenticated} =   useContext(Context);

const onsubmithandler = async  (e)=>{
    e.preventDefault();
try{
    const{ data } =await axios.post("https://library-backend-fwpd.onrender.com/api/v1/users/new",
    {
        name,email,password,        
    },{
        headers:{
            "Content-Type":"application/json"
        },
        withCredentials:true,
    }
    );
    toast.success(data.message)
    setIsAuthenticated(true);
} catch(error){
    toast.error(error.response.data.message)
    console.log(error)
    setIsAuthenticated(false);
}

}
if(isAuthenticated) return <Navigate to="/" />
  return (
<div className='login'>
    <section>
     <form onSubmit={onsubmithandler}>
         <input   value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Enter Yor Name' />
         <input  value={email} onChange={(e)=>setEmail(e.target.value)}  type="email" placeholder='Email' />
         <input  value={password} onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Password' />
         <button type='submit'>Register</button>
         <h4>Or</h4>
         <Link to='/login'>Log In</Link>
 
     </form>
    </section>
    </div>
  )
}

export default Register