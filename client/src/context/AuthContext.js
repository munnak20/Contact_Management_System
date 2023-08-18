import {children,  createContext, useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from "./ToastContext";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const {toast} =useContext(ToastContext);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location= useLocation();
  // const [error, setError] = useState(null);



  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // check if the user is logged in.
  const checkUserLoggedIn = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setUser(result);
        if(location.pathname==="/" || location.pathname==="/login" || location.pathname==="/register"){
          navigate("/",{replace:true})
        }
      }
      else{
        navigate("/login",{replace:true})
      } 
    } catch (err) {
      console.log(err);
    }
  };


  // Login user
  const loginUser = async (userData) => {
    try {
      // console.log(userData)
      const res = await fetch(`http://localhost:8000/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();
      if(!result.error){
        // console.log(result);
        localStorage.setItem("token",result.token);
        setUser(result.user);
        toast.success(`Logged in ${result.user.name} successfully`)
        if(location.pathname==="/login" || location.pathname==="/register"){
          navigate("/",{replace:true})
        }
      }else {
        toast.error(result.error)
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  // Register user
  const registerUser=async (userData) => {
    try {
      const res = await fetch(`http://localhost:8000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const result = await res.json();
      
      if (!result.error) {
        toast.success("user registered successfully! Please login into your account!");
        navigate("/login", { replace: true });
      } else {
        toast.error(result.error);
       
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ loginUser ,registerUser, user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
