import React, { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";

const getLogState = (onLoad) => {
  UserService.getUserById(localStorage.getItem("inputValue")).then((res) => this.setLogged({ user: res.data }));
}

const Header = () => {
    const [show,setShow]=useState(false);
    const navigate = useNavigate();
    const [user, setUser] = [];

    const islogin = localStorage.getItem("inputValue");

  
    useEffect(()=>{
        if(islogin){
            setShow(true);
        }else{
            setShow(false);
        }
    },[islogin])

    const userView =()=>{
      UserService.getUserById(islogin).then( (res) => {
        this.setUser({ user: res.data }); 
      });
      navigate("/userView", {user});
    }

    const removeItem =()=>{
        navigate("/");
        localStorage.removeItem("inputValue");
        localStorage.clear();
    }

  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark justify-between">
          <div>
            <a href="/" className="navbar-brand">
              E-Voting App
            </a>
          </div>
          {show&&<div>
            <button
              type="button"
              className="btn btn-info"
              onClick={userView}
            >
              Profile
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginLeft: "10px" }}
              onClick={removeItem}
            >
              Logout
            </button>
          </div>}
        </nav>
      </header>
    </div>
  );
};

export default Header;
