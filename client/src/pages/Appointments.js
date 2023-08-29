import React, { useEffect, useState } from 'react';
import "../styles/user.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from '../components/Navbar';

const Appointments = () => {

  const [appointments,setAppointments]=useState([]);
  const {id}= jwt_decode(localStorage.getItem("token"));

  const getAllAppoint= async(e)=>{
    try {
      const {data}=await axios.get(`/api/appointment/getallappointments?search=${id}`,{
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
            doctorId: ele?.doctorId?._id,
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

  return (
    <>
      <Navbar/>
      <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments">
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
                    {id === appointments[0].doctorId?._id ? (
                      <th>Action</th>
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {appointments?.map((ele, i) => {
                    return (
                      <tr key={ele?._id}>
                        <td>{i + 1}</td>
                        <td>
                          {ele?.doctorId?.firstname + " " + ele?.doctorId?.lastname}
                        </td>
                        <td>
                          {ele?.userId?.firstname + " " + ele?.userId?.lastname}
                        </td>
                        <td>{ele?.date}</td>
                        <td>{ele?.time}</td>
                        <td>{ele?.createdAt.split("T")[0]}</td>
                        <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                        <td>{ele?.status}</td>
                        {id === ele?.doctorId?._id ? (
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
                          </td>
                        ) : (
                          <></>
                        )}
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

export default Appointments