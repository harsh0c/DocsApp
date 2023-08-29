import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../styles/user.css";
import toast from "react-hot-toast";

const Users = () => {

  const [users,setUsers]= useState([]);

  const getAllUsers= async(e)=>{
    try {
      const {data}= await axios.get("/api/user/getallusers",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(data);

    } catch (error) { }
  }

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.delete("/api/user/deleteuser", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { userId },
          }),
          {
            pending: "Deleting in...",
            success: "User deleted successfully",
            error: "Unable to delete user",
            loading: "Deleting user...",
          }
        );
        getAllUsers();
      }
    } catch (error) {
      return error;      
    }
  };

  useEffect(()=>{
    getAllUsers();
  },[]);

  return (
    <>
      <section className='user-section'>
        <h3 className='home-sub-heading'>All users</h3>
        {users.length >0 ?(
          <div className='user-conatiner'>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Is Doctor</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((ele, i)=>{
                  return (
                    <tr key={ele?._id}>
                      <td>{i+1}</td>
                      <td>{ele?.firstname}</td>
                      <td>{ele?.lastname}</td>
                      <td>{ele?.email}</td>
                      <td>{ele?.isDoctor ? "Yes": "No"}</td>
                      <td className='select'>
                        <button
                          className='btn user-btn'
                          onClick={()=>{
                            deleteUser(ele?._id);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ): (
          <h1>Nothing to show here</h1>
        )}
      </section>
    </>
  )
};

export default Users