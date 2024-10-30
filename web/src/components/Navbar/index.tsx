import { useNavigate } from 'react-router-dom';
import { Colors } from '../../../../Theme';
import "./style.css"
function Navbar() {
    const navigate = useNavigate()

    const Navigatepage = (value: string) => {
        navigate(value);
    }

    return (
        <div className='w-full bg-white h-20 flex justify-end items-center gap-10 pr-10' >
            <div className="NavStyle" onClick={() => Navigatepage('/signin')}>
                <div className={`Sign-In hover:bg-MAIN_COLOR transition ease-in-out delay-150 duration-500 ... `} style={{ borderStyle: 'solid', borderColor: Colors.MAIN_COLOR }}  >
                    Log in
                </div>
            </div>
            <div className='NavStyle' onClick={() => Navigatepage('/signup')} >
                <div className={'Sign-up bg-MAIN_COLOR hover:bg-white hover:border-2 hover:border-MAIN_COLOR transition duration-500'} >
                    Sign up
                </div>
            </div>
        </div>
    )
}

export default Navbar