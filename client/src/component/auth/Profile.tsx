import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate, getMyProfileAPI } from '../../redux/apiRequest';
import Loading from '../Loading';

interface User {
    id: number,
    username: string,
    email: string,
    address: string,
    role: string,
    imageURL: string,
    created_at: string
}

const Profile: React.FC = () => {
    const currentUser = useSelector((state: any) => state.auth.login?.currentUser);
    const [user, setUser] = React.useState<Partial<User> | null>(null)
    const [loading, setLoading] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const getProfile = async () => {
        try {
            setLoading(true)
            const res = await getMyProfileAPI(currentUser.access_token)
            setUser(res?.data)
            setLoading(false)
        } catch (e) {
            // navigate("/login")
        }
    }

    React.useEffect(() => {
        getProfile()

    }, [])
    if (loading) {
        return <Loading />
    }

    if (!currentUser) {
        // Xử lý trường hợp người dùng không đăng nhập hoặc không có thông tin người dùng
        return <div>You are not logged in.</div>;
    }

    console.log(user)



    return (
        <div className="container mx-auto p-4 shadow-xl my-4">
            <h2 className="text-3xl font-semibold mb-4">My Profile</h2>
            {user && <div className="bg-white rounded-lg p-6">
                <div className="flex items-center space-x-4">
                    <img
                        className="w-24 h-24 rounded-full object-cover"
                        // src={user.imageURL}
                        src={user.role == "SELLER" ?  "https://cdn1.iconfinder.com/data/icons/professional-avatar-14/130/professional-30-512.png"
                  : user.role == "ADMIN" ?  "https://cdn4.iconfinder.com/data/icons/jobs-and-occupations-3/64/Salesman-seller-transaction-advice-job-avatar-profession-occupation-512.png" : "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"}
                        alt={`${user.username}'s profile`}
                    />
                    <div>
                        <h3 className="text-xl font-semibold">{user.username}</h3>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <hr className="my-4" />

                <div>
                    <h4 className="text-lg font-semibold">Address</h4>
                    <p>{user.address}</p>
                </div>

                <div className="mt-4">
                    <h4 className="text-lg font-semibold">Role</h4>
                    <p>{user.role}</p>
                </div>

                <div className="mt-4">
                    <h4 className="text-lg font-semibold">Created At</h4>
                    <p>{formatDate(user.created_at as string)}</p>
                </div>
            </div>}
        </div>
    );
};

export default Profile;
