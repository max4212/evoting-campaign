import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import UserService from "../../services/UserService";

export default function ModifyUser() {
  const location = useLocation();
  const [userId, setUserId] = useState(
    location.state ? location.state.userId : null
  );
  const [userName, setUserName] = useState(
    location.state ? location.state.userName : ""
  );
  const [userPW, setUserPW] = useState(
    location.state ? location.state.userPW : ""
  );
  const [email, setEmail] = useState(
    location.state ? location.state.email : ""
  );
  const [userType, setUserType] = useState(
    location.state ? location.state.userType : ""
  );
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [searchData, setSearchData] = useState([]);

  console.log(location.state);

  const dataChangeHandler = (event) => {
    if (event.target.id === "userName") {
      setUserName(event.target.value);
    } else if (event.target.id === "userPW") {
      setUserPW(event.target.value);
    } else if (event.target.id === "email") {
      setEmail(event.target.value);
    } else if (event.target.id === "userType") {
      setUserType(event.target.value);
    } else if (event.target.id === "saveBtn") {
      // console.log(user)

      const user = {
        userName: userName,
        userPW: userPW,
        email: email,
        userType: userType,
      };
      console.log(user);
      //   UserService.createUser(user.id, user).then((res) => {
      //     console.log(res);
      //   });
      UserService.updateUser(user, location.state.id);
      setData({
        userName,
        userPW,
        email,
        userType,
      });
      navigate("/users");
      window.location.reload();
    } else if (event.target.id === "backBtn") {
      navigate(-1);
    }
  };
  
  return (
    <div className="w-100 pt-10 flex justify-center align-middle">
      <div className="bg-slate-500 container p-10 rounded-md">
        <form className="container">
          <div className="mb-3">
            <label htmlFor="userName" className="form-label font-semibold">
              User Name
            </label>
            <input
              onChange={dataChangeHandler}
              type="text"
              className="form-control"
              id="userName"
              value={userName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userPW" className="form-label font-semibold">
              Password
            </label>
            <input
              onChange={dataChangeHandler}
              type="text"
              className="form-control"
              id="userPW"
              value={userPW}
            />
          </div>
		  <div className="mb-3">
            <label htmlFor="email" className="form-label font-semibold">
              E-Mail Address
            </label>
            <input
              onChange={dataChangeHandler}
              type="text"
              className="form-control"
              id="email"
              value={email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userType" className="form-label font-semibold">
              User Type
            </label>
            <input
              onChange={dataChangeHandler}
              type="text"
              className="form-control"
              id="userType"
              value={userType}
            />
          </div>
          <div className="flex align-middle gap-x-2 mt-2">
            <button
              type="button"
              className="w-100 btn btn-dark"
              onClick={dataChangeHandler}
              id="saveBtn"
            >
              Save
            </button>
            <button
              type="button"
              className="w-100 btn btn-dark"
              onClick={dataChangeHandler}
              id="backBtn"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
