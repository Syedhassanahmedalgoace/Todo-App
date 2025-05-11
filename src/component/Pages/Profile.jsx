import React, { useEffect, useState } from "react";
import { auth, db, logout } from "../../firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const doc = await getDocs(q);
                if (!doc.empty) {
                    setUserDetails(doc.docs[0].data());
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to load profile");
            }
        };

        if (loading) return;
        if (!user) return navigate("/login");
        fetchUserDetails();
    }, [user, loading, navigate]);

    return (
        <div className="flex-col items-center justify-center p-4">
            {error && <div className="text-red-500 text-center">{error.message}</div>}

            <div className="flex items-center justify-between py-5">
                <Link to={"/"}>
                    <button className="bg-purple-700 text-white text-xs sm:text-base rounded-full py-2 px-5">
                        Form Page
                    </button>
                </Link>
                <button
                    onClick={logout}
                    className="bg-purple-700 text-white text-xs sm:text-base rounded-full py-2 px-5"
                >
                    Logout
                </button>
            </div>

            <h1 className="text-4xl mb-4 text-center">Profile Page</h1>
            <div className="border-[1px] border-gray-300" />

            <div className="flex flex-col md:flex-row items-center bg-gray-100 p-5 mt-5 rounded-xl gap-8">
                {userDetails.img && (
                    <div className="h-[150px] w-[150px] min-w-[150px]">
                        <img
                            src={userDetails.img}
                            alt="user"
                            className="rounded-full w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="space-y-3">
                    <div className="font-semibold text-lg">
                        Email: <span className="text-purple-500">{user?.email}</span>
                    </div>

                    {userDetails.firstName && (
                        <div className="font-semibold text-lg">
                            First Name: <span className="text-purple-500">{userDetails.firstName}</span>
                        </div>
                    )}

                    {userDetails.lastName && (
                        <div className="font-semibold text-lg">
                            Last Name: <span className="text-purple-500">{userDetails.lastName}</span>
                        </div>
                    )}

                    {userDetails.age && (
                        <div className="font-semibold text-lg">
                            Age: <span className="text-purple-500">{userDetails.age}</span>
                        </div>
                    )}

                    {userDetails.profession && (
                        <div className="font-semibold text-lg">
                            Profession: <span className="text-purple-500">{userDetails.profession}</span>
                        </div>
                    )}

                    {userDetails.address && (
                        <div className="font-semibold text-lg">
                            Address: <span className="text-purple-500">{userDetails.address}</span>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Profile;