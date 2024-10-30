import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../../Redux/Slice/authSlicer"
import { RootState, AppDispatch } from "../../../../Redux/Store/index"
const Signin = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    if (user) {
        console.log(user)
    }

    return (
        <div>Signin</div>
    )
}

export default Signin