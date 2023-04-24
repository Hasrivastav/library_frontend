import React ,{useState}from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/App.scss'
import {createContext} from "react"




export const server = "https://library-backends.onrender.com/api/v1"

export const Context = createContext({isAuthenticated:false});

const AppWrapper = () =>{

  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const  [loading,setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <Context.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      loading,setLoading,
      update,setUpdate,

    }}
    >
  <App />
</Context.Provider>
  )
}



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AppWrapper />
  </React.StrictMode>
)
