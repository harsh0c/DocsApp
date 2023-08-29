import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../styles/user.css";
import toast from "react-hot-toast";


const AdminApplications = () => {
  
  const [applications,setApplications] = useState([]);
  
  const getAllApp=async(e)=>{
    try {
        const {data} =await axios.get("/api/doctor/getnotdoctors",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setApplications(data);
    } catch (error) {
        
    }
  };

  const acceptUser= async(userId)=>{
    try {
      const confirm= window.confirm("Are you sure you want to accept?");
      if(confirm){
        const {data}= await toast.promise(
          axios.put(
            "/api/doctor/acceptdoctor",
            {id: userId},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: {userId},
            }
          ),
          {
            success: "Application accepted",
            error: "Unable to accept application",
            loading: "Accepting application...",
          }
        );
        getAllApp();
      }
    } catch (error) {
      return error;
    }
  };

  const rejectUser= async(userId)=>{
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        const { data } = await toast.promise(
          axios.put(
            "/api/doctor/rejectdoctor",
            { id: userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId },
            }
          ),
          {
            success: "Application rejected",
            error: "Unable to reject application",
            loading: "Rejecting application...",
          }
        );
        getAllApp();
      }
    } catch (error) {
      return error;
    }
  };


  useEffect(()=>{
    getAllApp();
  },[]);

  return (
    <>
        <section className="user-section">
          <h3 className="home-sub-heading">All Applications</h3>
          {applications.length > 0 ? (
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>{ele?.userId?.firstname}</td>
                        <td>{ele?.userId?.lastname}</td>
                        <td>{ele?.userId?.email}</td>
                        <td>{ele?.experience}</td>
                        <td>{ele?.specialization}</td>
                        <td>{ele?.fees}</td>
                        <td className="select">
                          <button
                            className="btn user-btn accept-btn"
                            onClick={() => {
                              acceptUser(ele?.userId?._id);
                            }}
                          >
                            Accept
                          </button>
                          <button
                            className="btn user-btn"
                            onClick={() => {
                              rejectUser(ele?.userId?._id);
                            }}
                          >
                            Reject
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
  );
}

export default AdminApplications