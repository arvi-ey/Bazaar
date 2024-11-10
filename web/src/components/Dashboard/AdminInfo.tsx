import { useSelector } from "react-redux";
import { RootState, } from "../../../../Redux/Store/index"
import UserImage from "../../assets/demo_user.jpg"
import MoreVertIcon from '@mui/icons-material/MoreVert';
const AdminInfo = () => {
    const { user } = useSelector((state: RootState) => state.user)
    return (
        <>
            <img src={user?.profile_picture ? user.profile_picture : UserImage} alt="user_image" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
            <div>
                <p className='text-xs  text-TEXT_COLOR' >{user?.name}</p>
                <p className='text-xs  text-TEXT_COLOR' >{user?.email}</p>
            </div>
            <div className=''>
                <MoreVertIcon className={`text-TEXT_COLOR`} fontSize='medium' />
            </div>
        </>
    )
}

export default AdminInfo