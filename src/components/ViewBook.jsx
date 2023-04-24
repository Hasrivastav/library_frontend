
import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Cards } from "./BookDetail";
import "../styles/Card.scss";
import { Context } from "../index";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import '../styles/Card.scss'
import { server } from "../index";

import { Input } from "antd";
const { Search } = Input;


const ViewBook = () => {
  const { update, setUpdate, isAuthenticated, loading, setLoading } = useContext(Context);
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

 
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          "https://library-backend-fwpd.onrender.com/api/v1/task/showAll",
          {
            withCredentials: true,
          }
        );
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
      fetchExchanges();
    
  }, [update]);

  
  
  const deleteHandler =async(id)=>{
    try {
      const {data} =await axios.delete(`${server}/task/${id}`,
    
       {
        withCredentials:true,
       })
       toast.success(data.message);
       setUpdate((prev)=>!prev)

      
     } catch (error) {
       toast.error(error.response.data.message);
     }
  }
  

 const handleSearch = (value) => {
    setSearchQuery(value);
};

const filteredBooks = books.filter((book) =>
book.title.toLowerCase().includes(searchQuery.toLowerCase())
);

if(!isAuthenticated) {
    return <Navigate to="/Login"/>

}
    

 
  return (

   <div className="ViewBookClass">
    <div className="search-bar">
        <Search
          placeholder="Search for books by title"
          allowClear
          onChange={(e)=> handleSearch(e.target.value)}
          style={{ width: 400 }}
        />
        </div>  
        <div className="Cards">
      {loading ? (
        <Loader />
      ) : (
        filteredBooks.map((i) => (
          <div className="BooksChild" key={i._id}>
              <Cards
              i={i._id}
              key={i._id}
              id={i._id}
              title={i.title}
              author={i.author}
         
              filteredBooks={filteredBooks}
              deleteHandler={deleteHandler}
          
            />
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default ViewBook;
