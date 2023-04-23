import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import Register from './components/Register';
import ViewBook from './components/ViewBook';
import axios from 'axios';

import './styles/App.scss';
import { useContext ,useEffect} from 'react';
import { server,Context } from './index';



function App() {

  const {setUser,setIsAuthenticated,isAuthenticated,setLoading} =useContext(Context)
 
 
  
  return (
    <div className="App">
       <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route disable={isAuthenticated} path='/viewBooks' element={<ViewBook />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
      <Toaster />
    </Router>

  
    
    </div>
  );
}

export default App;

