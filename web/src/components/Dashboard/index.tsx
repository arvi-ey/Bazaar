import { Link, Outlet } from 'react-router-dom';
import Sidenav from './Sidenav';
const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidenav />
            <div className='p-4 w-full h-[100vh] flex flex-col gap-5 '>
                {/* <div className='w-full flex items-center h-14 rounded-md shadow-md'>
                    <h1 className='font-extrabold text-2xl ml-3' >Bazaar Admin</h1>
                </div> */}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
