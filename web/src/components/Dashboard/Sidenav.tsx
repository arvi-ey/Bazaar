import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Redux/Store/index"
import SettingsIcon from '@mui/icons-material/Settings';
import UserImage from "../../assets/demo_user.jpg"
const Sidenav = () => {
    const { user, error, loading } = useSelector((state: RootState) => state.user)
    return (
        <nav style={{ width: '250px', borderRight: '1px solid #ccc', padding: '20px' }}>
            <ul>
                <li><Link to="">Banner</Link></li>
                <li><Link to="product">Product</Link></li>
                <li><Link to="category">Category</Link></li>
            </ul>
            <div className={`mb-20 flex gap-2 ml-1 items-center cursor-pointer hover:bg-slate-100`} >
                <img src={user?.profile_picture ? user.profile_picture : UserImage} alt="user_image" width="60px" height="60" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />

                <div>
                    <p className='text-sm  text-TEXT_COLOR' >{user?.name}</p>
                    <p className='text-sm  text-TEXT_COLOR' >{user?.email}</p>
                </div>
                <div className='gap-1 flex flex-col'>
                    <div className='h-1 w-1 rounded-full bg-TEXT_COLOR' ></div>
                    <div className='h-1 w-1 rounded-full bg-TEXT_COLOR' ></div>
                    <div className='h-1 w-1 rounded-full bg-TEXT_COLOR' ></div>
                </div>
            </div>
        </nav>
    )
}

export default Sidenav