import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";

const AdminDoctors = () => {
  
  const [doctors,setDoctors]=useState([]);

  const getAllDoctors= async(e)=>{
    try {
        const {data}=await axios.get("/api/doctor/getalldoctors",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDoctors(data);
    } catch (error) {
        
    }
  }

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.put(
            "/api/doctor/deletedoctor",
            { userId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Doctor deleted successfully",
            error: "Unable to delete Doctor",
            loading: "Deleting Doctor...",
          }
        );
        getAllDoctors();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(()=>{
    getAllDoctors();
  },[]);

  return (
    <>
      <section className="user-section">
          <h3 className="home-sub-heading">All Doctors</h3>
          {doctors.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Experience</th>
                    <th>Specialization</th>
                    <th>Fees</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        
                        <td>{ele?.userId?.firstname}</td>
                        <td>{ele?.userId?.lastname}</td>
                        <td>{ele?.userId?.email}</td>
                        {/* <td>{ele?.userId?.mobile}</td> */}
                        <td>{ele?.experience}</td>
                        <td>{ele?.specialization}</td>
                        <td>{ele?.fees}</td>
                        <td className="select">
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              deleteUser(ele?.userId?._id);
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
          ) : (
            <h1>Nothing to show here</h1>
          )}
        </section>
    </>
  )
}

export default AdminDoctors