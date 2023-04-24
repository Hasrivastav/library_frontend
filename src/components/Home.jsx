import React, { useState } from 'react'

import { useContext } from 'react'
import { Context } from '..'
import { server } from '../index'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// import { Navigate } from 'react-router-dom'



const Home = () => {

    const {isAuthenticated,setLoading,setUpdate,loading} = useContext(Context);
    const [title,setTile]= useState("");
    const [author,setAuthor]= useState("");
  
   
    if(!isAuthenticated) return <Navigate to="/login" />


    const onsubmithandler =async (e)=>{
        e.preventDefault();
        try {
          setLoading(true);
          const {data} = await axios.post(`${server}/task/new`,{
            title,
            author,
          },{
            withCredentials:true,
            headers:{
              "Content-Type":"application/json"
            }
          })
          setTile("");
          setAuthor("");
          toast.success(data.message);
          setLoading(false);
          setUpdate((prev)=>!prev)
      
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      };
    
  return (
    <div className='login'>
   <section>
    <form onSubmit={onsubmithandler}>
    <input  value={title} onChange={(e)=>setTile(e.target.value)}  type="text" placeholder='Title' />
    <input  value={author} onChange={(e)=>setAuthor(e.target.value)}  type="text" placeholder='Author' />
        <button  disabled={loading} type='submit'>Add Book</button>
      
    </form>
   </section>
   </div>
  )
}

export default Home