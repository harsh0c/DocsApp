import React from 'react'
import Sidebar from '../components/Sidebar'
import Users from '../components/Users'
import AdminDoctors from '../components/AdminDoctors';
import AdminApplications from '../components/AdminApplications';
import AdminAppointments from '../components/AdminAppointments';

const Dashboard = (props) => {
  const {type}= props;
  return (
    <>
        <section className='layout-section'>
            <div className='layout-container'>
                <Sidebar/>
                {type === "users" ? (
                  <Users/>
                ): type === "doctors" ?(
                  <AdminDoctors/>
                ): type === "applications" ?(
                  <AdminApplications/>
                ): type === "appointments" ?(
                  <AdminAppointments/>
                ): (
                  <></>
                )}
            </div>
        </section>
    </>
  )
}

export default Dashboard