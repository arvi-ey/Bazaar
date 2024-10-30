import BgLogo from "/Signup.jpg"
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
function Signup() {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: '',
    });

    const navigate = useNavigate();
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
                        id="confirm _password"
                        label="Confirm Password"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    <button
                        onClick={OnSignup}
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 flex gap-2 justify-center text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <span className="text-blue-500 hover:underline cursor-pointer" onClick={() => navigate('/signin')}>
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup