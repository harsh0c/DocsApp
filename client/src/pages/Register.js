import React, { useState } from 'react'
import "../styles/register.css"
import { NavLink,useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"

const Register = () => {

    const [formDetails,setFormDetails]=useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confpassword: "",
    });
    const navigate=useNavigate();

    const inputChange=(e)=>{
        const{name , value}=e.target;
        return setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };

    const formSubmit=async (event)=>{
        try {
            event.preventDefault();
            const { firstname, lastname, email, password, confpassword } = formDetails;
            if (!firstname || !lastname || !email || !password || !confpassword) {
                return toast.error("Input field should not be empty");
              } else if (firstname.length < 1) {
                return toast.error("First name must be at least 2 characters long");
              } else if (lastname.length < 3) {
                return toast.error("Last name must be at least 2 characters long");
              } else if (password.length < 3) {
                return toast.error("Password must be at least 3 characters long");
              } else if (password !== confpassword) {
                return toast.error("Passwords do not match");
              }

              const { data } = await toast.promise(
                axios.post("/api/user/register", {
                  firstname,
                  lastname,
                  email,
                  password,
                }),
                {
                  pending: "Registering user...",
                  success: "User registered successfully",
                  error: "Unable to register user",
                  loading: "Registering user...",
                }
              );
              return navigate("/login");

        } catch (error) {}
    }
  return (
    <section className="register-section flex-center">
    <div className="register-container flex-center">
      <h2 className="form-heading">Sign Up</h2>
      <form
        onSubmit={formSubmit}
        className="register-form"
      >
        <input
          type="text"
          name="firstname"
          className="form-input"
          placeholder="Enter your first name"
          value={formDetails.firstname}
          onChange={inputChange}
        />
        <input
          type="text"
          name="lastname"
          className="form-input"
          placeholder="Enter your last name"
          value={formDetails.lastname}
          onChange={inputChange}
        />
        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="Enter your email"
          value={formDetails.email}
          onChange={inputChange}
        />
        {/* <input
          type="file"
        //   onChange={(e) => onUpload(e.target.files[0])}
          name="profile-pic"
          id="profile-pic"
          className="form-input"
        /> */}
        <input
          type="password"
          name="password"
          className="form-input"
          placeholder="Enter your password"
          value={formDetails.password}
          onChange={inputChange}
        />
        <input
          type="password"
          name="confpassword"
          className="form-input"
          placeholder="Confirm your password"
          value={formDetails.confpassword}
          onChange={inputChange}
        />
        <button
          type="submit"
          className="btn form-btn"
        //   disabled={loading ? true : false}
        >
          sign up
        </button>
      </form>
      <p>
        Already a user?{" "}
        <NavLink
            className="login-link"
            to={"/login"}
        >
            Log in
        </NavLink>
      </p>
    </div>
  </section>
  )
}

export default Register