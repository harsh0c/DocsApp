import React from 'react'
import "../styles/sidebar.css"
import {FaHome,FaList,FaUser,FaUserMd,FaUsers,FaEnvelope} from "react-icons/fa"
import {MdLogout} from "react-icons/md"
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

    const sidebar = [
        {
          name: "Home",
          path: "/",
          icon: <FaHome />,
        },
        {
          name: "Users",
          path: "/dashboard/users",
          icon: <FaUsers />,
        },
        {
          name: "Doctors",
          path: "/dashboard/doctors",
          icon: <FaUserMd />,
        },
        {
          name: "Appointments",
          path: "/dashboard/appointments",
          icon: <FaList />,
        },
        {
          name: "Applications",
          path: "/dashboard/applications",
          icon: <FaEnvelope />,
        },
        // {
        //   name: "Profile",
        //   path: "/profile",
        //   icon: <FaUser />,
        // },
      ];

  return (
    <>
        <section className='sidebar-section flex-center'>
            <div className='sidebar-container'>
                <ul>
                    {sidebar.map((ele,i)=>{
                        return (
                            <li key={i}>
                                {ele.icon}
                                <NavLink to={ele.path}>{ele.name}</NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    </>
  )
}

export default Sidebar