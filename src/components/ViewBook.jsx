import React, { useContext, useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Cards } from "./BookDetail";
import "../styles/Card.scss";
import { Context, server } from "../index";

const ViewBook = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const {data}  = await axios.get(`${server}/task/showAll`);
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }
    };

    if (isAuthenticated) {
      fetchBooks();
    } else {
      // Redirect to login page or show a message
    }
  }, [isAuthenticated, setIsAuthenticated]);

  return (
    <div className="ViewBookClass">
      {loading ? (
        <Loader />
      ) : (
        books.map((i) => (
          <div className="BooksChild" key={i._id}>
              <Cards
              i={i}
              key={i._id}
              id={i._id}
              title={i.title}
              author={i.author}
            //   setUpdate={setUpdate}
          
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ViewBook;