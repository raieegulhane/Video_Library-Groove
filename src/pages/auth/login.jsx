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

    useEffect(() => {
        isAuth && navigate(location?.state?.from ? location.state.from : "/home", { replace: true });
    }, [isAuth])

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

    return (
        <div className="auth-wr">
            <div className="auth-cn auth-cn-login">
                <h1 className="auth-heading">Login</h1>
                <form 
                    className="auth-form fx-col"
                    action="submit"
                >
                    <label htmlFor="email">
                        <input 
                            className="auth-inp"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={updateLoginCreds}
                        />
                    </label>
                    <label htmlFor="password">
                        <PasswordInput
                            id={"password"}
                            name={"password"}
                            placeholder={"Password"}
                            value={password}
                            onChange={updateLoginCreds}
                        />
                    </label>

                    <div className="form-btn-cn fx-c">
                        <button
                            className="auth-btn-pri btn btn-primary btn-wt-i"
                            type="submit"
                            onClick={(e) => loginHandler(e, loginCreds, false)}
                        >
                            <span>Continue</span>
                            <i className="fa-solid fa-angles-right"></i>
                        </button>
                        <button
                            className="auth-btn-ol btn btn-outline btn-wt-i btn-rd"
                            type="submit"
                            onClick={(guestLoginHandler)}
                        >
                            Continue as Guest
                            <i className="fa-solid fa-user-astronaut"></i>
                        </button>
                    </div>
                </form>
                <p className="auth-alt-cta fx-r fx-js-c">
                    <span>New user?</span> 
                    <Link 
                        to="/signup" 
                        className="btn-link auth-btn-link"
                    >
                        Sign Up
                    </Link> 
                    <span>here.</span>
                </p>
            </div>
        </div>
    );
}