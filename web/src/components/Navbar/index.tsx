import { useNavigate } from 'react-router-dom';
import { Colors } from '../../../../Theme';
import logo from "../../assets/Bazaar_web_logo.svg"
import "./style.css"
function Navbar() {
    const navigate = useNavigate()

    const Navigatepage = (value: string) => {
        navigate(value);
    }

    return (
        <div className='w-full bg-white h-20 flex justify-around items-center gap-10 ' >
            <div className='w-[10%]  flex justify-center' >
                <img src={logo} alt="Logo" style={{ height: 75, width: 75 }} />
            </div>
            <div className='flex w-[80%] justify-end gap-11' >
                <div className="NavStyle" onClick={() => Navigatepage('/signin')}>
                    <div className={`Sign-In hover:bg-MAIN_COLOR transition ease-in-out delay-150 duration-500 ... `} style={{ borderStyle: 'solid', borderColor: Colors.MAIN_COLOR }}  >
                        Log in
                    </div>
                </div>
                <div className='NavStyle' onClick={() => Navigatepage('/signup')} >
                    <div className={'Sign-up bg-MAIN_COLOR  hover:bg-SECONDARY_COLOR transition duration-500'} >
                        Sign up
                    </div>
                </div>
                <div className='NavStyle' onClick={() => Navigatepage('/dashboard')} >
                    <div className={'Sign-up bg-MAIN_COLOR  hover:bg-SECONDARY_COLOR transition duration-500'} >
                        Dash Board
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar