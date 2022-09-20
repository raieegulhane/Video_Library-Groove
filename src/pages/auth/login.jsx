import "./auth.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { loginService } from "../../services";
import { useAuth } from "../../contexts";
import { PasswordInput } from "../../components";

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { authState: { isAuth }, authDispatch } = useAuth();

    const initialLoginCreds = { email: "", password: "" };
    const [loginCreds, setLoginCreds] = useState(initialLoginCreds);
    const { email, password } = loginCreds;

    const updateLoginCreds = (event) => {
        const { name, value } = event.target;
        setLoginCreds((loginCreds) => ({ ...loginCreds, [name]: value}))
    }

    // useEffect(() => {
    //     isAuth && navigate(location?.state?.from ? location.state.from : "/home", { replace: true });
    // }, [isAuth])

    const loginHandler = async (event, formData, guestLoginStatus) => {
        event.preventDefault();

        try {
            const response = await loginService(formData);
            const { foundUser, encodedToken } = response.data;

            authDispatch({
                type: "AUTH_INIT",
                payload: {
                    isAuth: true,
                    authToken: encodedToken,
                    userData: { ...foundUser }
                }
            });
            localStorage.setItem("auth-token", encodedToken);
            localStorage.setItem("user-data", JSON.stringify(foundUser));

            navigate(location?.state?.from ? location.state.from : -1, { replace: true });

            guestLoginStatus ?
                toast.success("Logged in as guest.") :
                toast.success("Login successful.");
        } catch (error) {
            console.log("LOGIN_ERROR: ", error);
            if(error.message.includes(404)) {
                if (!email || !password) {
                    toast.warning("All fields must be filled.");
                }
                if (email) {
                    toast.error("Email not registered. Please sign up to continue.");
                }
                return;
            }
            if(error.message.includes(401)) {
                if (email && password) {
                    toast.error("Incorrect email or password.");
                }
                return;
            }
            toast.error("Error occured while logging in.");
        }
    }

    const guestLoginHandler = async (event) => {
        event.preventDefault();

        setLoginCreds((loginCreds) => ({ ...loginCreds, email: "janedoe@example.com", password: "janeDoe123"}))
        loginHandler(event, { email: "janedoe@example.com", password: "janeDoe123"}, true);
    }

    return(
        <div className="auth-wrapper">
            <div className="main-container container-fit">
                <div className="main-header flex-row flex_justify-center">
                    <h1 className="main-heading txt-underline">Login</h1>
                </div>

                <form className="auth-form flex-col">
                    <label
                        className="flex-col"
                        htmlFor="email"
                    >
                        <span className="auth-label-txt">Email:</span> 
                        <input 
                            className="auth-inp"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            required
                            value={email}
                            onChange={updateLoginCreds}
                        />
                    </label>
                    <label
                        className="flex-col"
                        htmlFor="password"
                    >
                        <span className="auth-label-txt">Password:</span>
                        <PasswordInput
                            id={"password"}
                            name={"password"}
                            placeholder={"******"}
                            value={password}
                            onChange={updateLoginCreds}
                        />
                    </label>
                    

                    <div className="form-btn-container flex-col">
                        <button
                            className="btn btn-primary btn-wt-icon btn-sq"
                            onClick={(e) => loginHandler(e, loginCreds, false)}
                        >
                            <span>Continue</span>
                            <i className="fa-solid fa-angles-right"></i>
                        </button>
                        <button
                            className="btn btn-outline btn-wt-icon btn-sq"
                            onClick={(guestLoginHandler)}
                        >
                            <span>Continue as Guest</span>
                            <i className="fa-solid fa-user-astronaut"></i>
                        </button>
                    </div>
                </form>

                <p className="alt-auth-cta flex-row flex_justify-center">
                    <span>New user?</span> 
                    <Link 
                        to="/signup" 
                        className="btn-link link-noDecoration"
                    >
                        Sign Up
                    </Link> 
                    <span>here.</span>
                </p>
            </div>
        </div>
    );
}