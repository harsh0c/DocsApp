import React, { useState } from 'react'
import "../styles/navbar.css";
import { NavLink,useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import {useDispatch} from "react-redux"
import {setUserInfo} from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import {useSelector} from "react-redux";
import axios from "axios";
import { useEffect } from "react";


const Navbar = () => {

  const { userInfo }=useSelector((state)=>state.root);
  const [iconActive,setIconActive]= useState(false);
  const dispatch= useDispatch();  
  const navigate=useNavigate();
  const [token,setToken]=useState(localStorage.getItem("token") || "");
  const [user,setUser]=useState(
    localStorage.getItem("token")
        ? jwt_decode(localStorage.getItem("token"))
        : ""
  );

  const logoutFunc=()=>{
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  }

  const getUser=async(id)=>{
    try {
      const {data}= await axios.get(`/api/user/getuser/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(setUserInfo(data));
      // console.log(userInfo);

      // return navigate("/");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    // if (!userInfo) {
      getUser(user.id);
    // }
  }, []);


  return (
    <header>
        <nav className={iconActive? "nav-active": ""}>
            <h2 className="nav-logo">
          <NavLink to={"/"}>BookMyDoctor</NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"}>Doctors</NavLink>
          </li>
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}
          {token && !user.isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              {/* <li>
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li> */}
              <li>
                <NavLink to={"/applyfordoctor"}>Apply for doctor</NavLink>
              </li>
              {/* <li>
                <HashLink to={"/#contact"}>Contact Us</HashLink>
              </li> */}
              <li>
                {/* <NavLink to={"/profile"}>Profile-{userInfo.firstname?.toUpperCase()}</NavLink> */}
                Profile-{userInfo?.firstname?.toUpperCase()}
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink
                  className="btn"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn"
                  to={"/register"}
                >
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span
                className="btn"
                onClick={logoutFunc}
              >
                Logout
              </span>
            </li>
          )}
        </ul>
        </nav>
        <div className="menu-icons">
          {!iconActive && (
            <FiMenu
              className="menu-open"
              onClick={() => {
                setIconActive(true);
              }}
            />
          )}
          {iconActive && (
            <RxCross1
              className="menu-close"
              onClick={() => {
                setIconActive(false);
              }}
            />
          )}
       </div>
    </header>
  )
}

export default Navbar