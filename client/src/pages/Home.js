import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  

  useEffect(() => {
    const goToLogin= async()=>{
      !user && navigate("/login", { replace: true });
    }
    goToLogin();
  }, []);

  return (
    <>
      <div className="jumbotron">
        <h1>Welcome {user ? user.name : null}</h1>
        <hr className="my-4" />
        <a className="btn btn-info" href="/create" role="button">
          Add Contacts
        </a>
      </div>
    </>
  );
};

export default Home;
