import BgLogo from "/Signup.jpg"
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../../../Redux/Slice/authSlicer"
import { RootState, AppDispatch } from "../../../../Redux/Store/index"

function Signup() {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth)

    const backgroundStyle = {
        backgroundImage: `url(${BgLogo})`,
    };

    const OnTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.id]: event.target.value });
    }

    const OnSignup = async (event: React.FormEvent) => {
        event.preventDefault()
        const { name, email, phone_number, password, confirm_password } = data
        if (!name.trim()) {
            alert('Name is required!')
            return
        }
        if (!email.trim()) {
            alert('Email is required!')
            return
        }
        if (!phone_number.trim()) {
            alert('Phone number is required!')
            return
        }
        if (!password.trim()) {
            alert('Password is required!')
            return
        }
        if (!confirm_password.trim()) {
            alert('Confirm password is required!')
            return
        }
        if (password !== confirm_password) {
            alert('Passwords do not match!')
            return
        }
        await dispatch(signupUser({ name, email, phone_number, password }))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" style={backgroundStyle}>
            <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form className={`flex flex-col gap-8`} >
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    <TextField
                        id="email"
                        label="Email Address"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    <TextField
                        id="phone_number"
                        label="Mobile Number"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    <TextField
                        id="confirm_password"
                        label="Confirm Password"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    <button
                        onClick={OnSignup}
                        type="submit"
                        className="w-full bg-MAIN_COLOR hover:bg-SECONDARY_COLOR text-black p-2 font-semibold text-xl rounded-md transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 flex gap-2 justify-center items-center text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <span className="bg-black text-white p-2 px-6 font-medium rounded-xl hover:bg-slate-900 cursor-pointer" onClick={() => navigate('/signin')}>
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup