import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import "../styles/doctors.css";
import DoctorCard from '../components/DoctorCard';

const Doctors = () => {

    const [doctors,setDoctors]=useState([]);

    const fetchAllDocs= async()=>{
        const {data}= await axios.get("/api/doctor/getalldoctors",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setDoctors(data);
    };

    useEffect(()=>{
        fetchAllDocs();
    },[]);

  return (
    <>
        <Navbar/>
        <section className="container doctors">
          <h2 className="page-heading">Our Doctors</h2>
          {doctors.length > 0 ? (
            <div className="doctors-card-container">
              {doctors.map((ele) => {
                return (
                  <DoctorCard
                    ele={ele}
                    key={ele._id}
                  />
                );
              })}
            </div>
          ) : (
            <h1>Nothing to show here</h1>
          )}
        </section>
    </>
  )
}

export default Doctors