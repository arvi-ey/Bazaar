import React from 'react';
import { Home, Person, Notifications, Settings, ExitToApp } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Redux/Store/index"
import { UserData } from '../../../../Redux/Slice/userSlicer';

// Define the props for NavItem
interface NavItemProps {
    icon: React.ReactNode;
    label: string;
}

// Define the props for ActivityItem
interface ActivityItemProps {
    date: string;
    description: string;
}

// Define the props for NotificationItem
interface NotificationItemProps {
    message: string;
}

const UserHome: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, error, loading } = useSelector((state: RootState) => state.user)


    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="p-6">
                    <h2 className="text-3xl font-semibold text-blue-600">Your App</h2>
                    <p className="text-gray-500 mt-1">Welcome back, User!</p>
                </div>
                <nav className="mt-10">
                    <ul>
                        <NavItem icon={<Home />} label="Dashboard" />
                        <NavItem icon={<Person />} label="Profile" />
                        <NavItem icon={<Notifications />} label="Notifications" />
                        <NavItem icon={<Settings />} label="Settings" />
                    </ul>
                </nav>
                <div className="absolute bottom-0 w-full p-6">
                    <NavItem icon={<ExitToApp />} label="Log Out" />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Top Navbar */}
                <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <p className="text-gray-600">Hello, User!</p>
                        <Avatar />
                    </div>
                </header>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Recent Activity */}
                    <section className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                        <ActivityItem date="Today" description="Checked your messages" />
                        <ActivityItem date="Yesterday" description="Updated your profile" />
                        <ActivityItem date="2 days ago" description="Followed a new user" />
                    </section>

                    {/* Notifications */}
                    <section className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Notifications</h2>
                        <NotificationItem message="You have a new friend request" />
                        <NotificationItem message="Your post was liked by John Doe" />
                        <NotificationItem message="System maintenance scheduled tomorrow" />
                    </section>
                </div>
            </div>
        </div>
    );
};

// NavItem component with type
const NavItem: React.FC<NavItemProps> = ({ icon, label }) => (
    <li className="flex items-center px-6 py-3 hover:bg-gray-200 transition-colors cursor-pointer">
        {icon}
        <span className="ml-4 text-gray-700">{label}</span>
    </li>
);

// ActivityItem component with type
const ActivityItem: React.FC<ActivityItemProps> = ({ date, description }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <p className="text-gray-600">{date}</p>
        <p className="text-gray-700 font-medium">{description}</p>
    </div>
);

// NotificationItem component with type
const NotificationItem: React.FC<NotificationItemProps> = ({ message }) => (
    <div className="p-4 bg-gray-100 rounded-lg mb-2">
        <p className="text-gray-700">{message}</p>
    </div>
);

export default UserHome;
