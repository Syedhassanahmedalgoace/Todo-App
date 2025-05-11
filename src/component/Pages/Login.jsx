import React, { useEffect, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, signInWithPhone } from "../../firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
    email: "",
    password: "",
    phone: "",
    otp: ""
};

const Login = () => {
    const [data, setData] = useState(initialState);
    const { password, email, phone, otp } = data;
    const [user, loading, error] = useAuthState(auth);
    const [showOtpField, setShowOtpField] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const navigate = useNavigate();

    const handlePhoneLogin = async (e) => {
        e.preventDefault();
        if (!phone) {
            toast.error("Phone number is required!");
            return;
        }

        try {
            const result = await signInWithPhone(`+${phone}`);
            setConfirmationResult(result);
            setShowOtpField(true);
            toast.success("OTP sent successfully!");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("OTP is required!");
            return;
        }

        try {
            await confirmationResult.confirm(otp);
            toast.success("Phone authentication successful!");
        } catch (err) {
            toast.error("Invalid OTP!");
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required!");
            return;
        }
        if (!password) {
            toast.error("Password is required!");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            switch (err.code) {
                case "auth/invalid-email":
                    toast.error("Invalid email!");
                    break;
                case "auth/user-not-found":
                    toast.error("User not found!");
                    break;
                case "auth/wrong-password":
                    toast.error("Wrong password!");
                    break;
                default:
                    toast.error("Login failed!");
            }
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/");
    }, [user, loading, navigate]);

    return (
        <div>
            <div className="flex items-center justify-between text-purple-500 font-bold mt-5 p-1">
                <Link to={"/register"}>
                    <div className="cursor-pointer flex items-center text-xs">
                        <MdArrowBackIos />
                        Back to register
                    </div>
                </Link>
                <div className="cursor-pointer text-xs">Need any help?</div>
            </div>

            <h1 className="text-2xl text-gray-800 text-center font-medium mt-5 p-2">
                Login
            </h1>
            <p className="text-gray-500 leading-5 text-center mb-2">
                Sign-in to continue
            </p>
            {error && <div className="my-4 text-center"> {error.message} </div>}

            {/* Email/Password Login */}
            <form onSubmit={handleEmailLogin} className="flex flex-col justify-center items-center">
                <label className="relative">
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
                    />
                    <span className="absolute top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
                        {email ? "" : "Email"}
                    </span>
                </label>
                <label className="relative">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
                    />
                    <span className="absolute w-[80px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
                        {password ? "" : "Password"}
                    </span>
                </label>
                <button
                    type="submit"
                    className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-purple-700 text-white text-base font-medium rounded-full mt-4"
                >
                    Login with Email
                </button>
            </form>

            {/* Phone Login */}
            <form onSubmit={showOtpField ? verifyOtp : handlePhoneLogin} className="flex flex-col justify-center items-center mt-4">
                {!showOtpField ? (
                    <label className="relative">
                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            placeholder="Country code + number"
                            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
                        />
                        <span className="absolute w-[120px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
                            {phone ? "" : "Phone Number"}
                        </span>
                    </label>
                ) : (
                    <label className="relative">
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            className="my-2 mx-1 w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] px-6 py-3 rounded-full outline-none border-[1px] border-gray-400 focus:border-purple-500 transition duration-200"
                        />
                        <span className="absolute w-[60px] top-5 text-gray-500 left-0 mx-6 px-2 transition duration-300 input-text">
                            {otp ? "" : "OTP"}
                        </span>
                    </label>
                )}
                <button
                    type="submit"
                    className="w-[270px] h-[30] xs:w-[360px] xs:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-purple-700 text-white text-base font-medium rounded-full mt-2"
                >
                    {showOtpField ? "Verify OTP" : "Login with Phone"}
                </button>
            </form>

            <div id="recaptcha-container"></div>

            <ToastContainer />
            <div className="flex items-center justify-center mt-5 text-gray-500">
                <div className="border-[1px] w-[200px] border-gray-300 mr-1" />
                OR
                <div className="border-[1px] w-[200px] border-gray-300 ml-1"></div>
            </div>
            <div className="flex flex-col items-center">
                <button
                    onClick={() => signInWithGoogle()}
                    className="w-[270px] h-[30] sm:w-[360px] sm:h-[40px] md:w-[450px] md:h-[50px] p-2 md:p-0 bg-gray-100 text-black text-base font-medium rounded-full mt-5 flex items-center justify-center"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/2991/2991148.png"
                        alt="google"
                        className="h-[25px] mr-2"
                    />
                    Login with Google
                </button>
                <div className="text-gray-600 mt-2 mb-5">
                    Don't have an account?{" "}
                    <Link to={"/register"}>
                        <span className="text-purple-500 font-medium">Register here</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;