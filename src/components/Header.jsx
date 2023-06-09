import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {Context, server} from "../"
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Header = () => {

  const {isAuthenticated,setIsAuthenticated,loading,setLoading} =   useContext(Context);
 
  const logoutHandler = async(e)=>{
  setLoading(true);
try{
await axios.get(`${server}/users/logout`,
    {
     
        withCredentials:true,
    }
    );
    toast.success("Logged Out Successfully")
    setIsAuthenticated(false);

    setLoading(false)
} catch(error){
    toast.error(error.respose.data.message)
     setIsAuthenticated(true);
    setLoading(false)
}

}
 
  return (
    <nav className='header'>
       <div>
        <h2>LIBRARY APP</h2>
       </div>
       
       <article >
        <Link to={"/"}>Add Book</Link>
        <Link  to={"/viewBooks"}>ViewBooks</Link> 
        {
          isAuthenticated?  <button disabled={loading} onClick={logoutHandler} className='btn'>Logout</button> :  <Link to={"/login"}>Login</Link>  
        }
       </article>
       

    </nav>
  )
}

export default Header

