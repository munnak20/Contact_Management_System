
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ToastContext from "../context/ToastContext";
const Register = () => {
  const {toast}= useContext(ToastContext)
  const {registerUser}=useContext(AuthContext);
  const [credentials, setCredentials] =useState({
    name:"",
    email: "",
    password: "",
    confirmPassword:"",
  })

  const handleInputChange = (event) => {
    const {name, value}= event.target;
     setCredentials({...credentials, [name]: value});
  }
   

  const handleSubmit= (event) => {
    event.preventDefault();
    if(!credentials.name ||!credentials.email || !credentials.password || !credentials.confirmPassword){
      toast.error("Please enter all the required field")
      return;
    }

    if(credentials.password !== credentials.confirmPassword){
      toast.error("Password do not match")
      return;
    }
    const userData={...credentials, confirmPassword:undefined};
    registerUser(userData);

  }



  return (
    <>

      <h3>Create your account</h3>
      <form onSubmit={handleSubmit}>
    
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="RamSyam"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="RamSyam@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label mt-4">
             Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <input
          type="submit"
          value={"Register"}
          classNameName="btn btn-primary my-2"
        />
        <p>
          Already have an account? <Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default Register;
