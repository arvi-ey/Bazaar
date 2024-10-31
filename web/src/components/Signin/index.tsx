import BgLogo from "../../assets/login_bg.jpg"
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../../../../Redux/Slice/authSlicer"
import { RootState, AppDispatch } from "../../../../Redux/Store/index"
import CircularProgress from '@mui/material/CircularProgress';


function Signin() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.auth)
    const backgroundStyle = {
        backgroundImage: `url(${BgLogo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const OnTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.id]: event.target.value });
    }
    const OnSignup = async (event: React.FormEvent) => {
        event.preventDefault()
        const { email, password } = data
        if (!email.trim()) {
            alert('Enter email!')
            return
        }
        if (!password.trim()) {
            alert('Password is required!')
            return
        }
        await dispatch(signinUser(data))
        navigate("/dashboard")
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" style={backgroundStyle}>
            <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
                <form className={`flex flex-col gap-8`} >
                    <TextField
                        id="email"
                        label="Email Address"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        onChange={OnTextChange}
                    />
                    {loading ?
                        <div className={`w-full flex items-center justify-center `} >
                            <CircularProgress size={24} style={{ color: "black" }} />
                        </div> :
                        <button
                            onClick={OnSignup}
                            type="submit"
                            className="w-full bg-MAIN_COLOR hover:bg-SECONDARY_COLOR text-black p-2 font-semibold text-xl rounded-md transition duration-200"
                        >
                            Sign In
                        </button>
                    }
                </form>
                <p className="mt-4 flex gap-2 justify-center items-center text-center text-sm text-gray-600">
                    Don't have any account ? Create new account{' '}
                    <span className="bg-black text-white p-2 px-6 font-medium rounded-xl hover:bg-slate-900 cursor-pointer" onClick={() => navigate('/signup')}>
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signin