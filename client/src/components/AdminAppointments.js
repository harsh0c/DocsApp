import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";

const AdminAppointments = () => {
  const [appointments,setAppointments]= useState([]);

  const getAllAppoint= async(e)=>{
    try {
      const {data}=await axios.get(`/api/appointment/getallappointments`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAppointments(data);
    } catch (error) {}
  }

  useEffect(()=>{
    getAllAppoint();
  },[]);

  const complete = async (ele) => {
    try {
      const { data } = await toast.promise(
        axios.put(
          "/api/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  const deleteApp=async(userId)=>{
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if(confirm){
        const { data } = await toast.promise(
          axios.delete(
            "/api/appointment/deleted",
            // {
            //   appointid: ele?._id,
            //   doctorId: ele?.doctorId._id,
            //   doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
            // },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId }
            }
          ),
          {
            pending: "Deleting in...",
            success: "Appointment deleted successfully",
            error: "Unable to delete appointment",
            loading: "Deleting appointment...",
          }
        );
  
        getAllAppoint();
      }
    } catch (error) {
      console.log("ErrorDel: "+error);
      return error;
    }
  }

  return (
    <>
      <section className="user-section">
          <h3 className="home-sub-heading">All Users</h3>
          {appointments.length > 0 ? (
            <div className="user-container">
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Doctor</th>
                    <th>Patient</th>
                    <th>Appointment Date</th>
                    <th>Appointment Time</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Status</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.firstname +
                            " " +
                            ele?.doctorId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                        <td>
                          <button
                            className={`btn user-btn accept-btn ${
                              ele?.status === "Completed" ? "disable-btn" : ""
                            }`}
                            disabled={ele?.status === "Completed"}
                            onClick={() => complete(ele)}
                          >
                            Complete
                          </button>
                        
                          <button
                            className={`btn user-btn delete-btn ${
                              ele?.status === "Completed" ? "disable-btn" : ""
                            }`}
                            disabled={ele?.status === "Completed"}
                            onClick={() => deleteApp(ele?._id)}
                          >
                            Delete
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

export default AdminAppointments