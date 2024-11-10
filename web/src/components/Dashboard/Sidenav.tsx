import { useNavigate } from 'react-router-dom';
import { RouteData } from './NavigationData';
import AdminInfo from './AdminInfo';
import logo from "../../assets/Bazaar_web_logo.svg"
const Sidenav = () => {

    const navigate = useNavigate()

    return (
        <div style={{ width: "15%", borderRight: '1px solid #ccc', paddingTop: '25px' }} className='flex flex-col items-center'>
            <div className='w-full flex justify-center' >
                <img src={logo} alt="Logo" style={{ height: 75, width: 75 }} />
            </div>
            {
                RouteData.map((item, index) => (
                    <div key={index} className={`flex flex-col gap-4 w-[95%] mt-5 cursor-pointer hover:bg-slate-100 `} onClick={() => navigate(`${item.route}`)}>
                        <div className={`w-full pl-5 flex items-center rounded-md h-11 gap-4 cursor-pointer hover:bg-slate-100 `} >
                            <div>
                                {item.icon}
                            </div>
                            <p className={`font-normal text-base `}>{item.text}</p>
                        </div>
                    </div>
                ))
            }
            <div className={` mt-24 py-4 rounded-md flex gap-1 ml-1 items-center cursor-pointer hover:bg-slate-100`} >
                <AdminInfo />
            </div>
        </div>
    )
}

export default Sidenav