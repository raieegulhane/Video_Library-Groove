import "./auth.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { signupService } from "../../services";
import { useAuth } from "../../contexts";
import { PasswordInput } from "../../components";


export const Signup = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const { authState: {isAuth}, authDispatch } = useAuth();

    const initialUserDetails = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: ""
    }
    const [ userDetails, setUserDetails ] = useState(initialUserDetails);
    const {
        email,
        password,
        confirmPassword,
        firstName,
        lastName
    } = userDetails;

    useEffect(() => {
        isAuth && navigate(location?.state?.from ? location.state.from : "/home", { replace: true });
    }, [isAuth])
    
    const updateUserDetails = (event) => {
        const { name, value } = event.target;
        setUserDetails((userDetails) => ({ ...userDetails, [name]: value }))
    }

    const signupHandler = async (event) => {
        event.preventDefault();

        try {
            if (!email || !password || !confirmPassword || !firstName || !lastName) {
                toast.warning("All fields must be filled.");
                return;
            }

            const response = await signupService(userDetails);
            const { createdUser, encodedToken } = response.data;

            authDispatch({
                type: "AUTH_INIT",
                payload: {
                    isAuth: true,
                    authToken: encodedToken,
                    userData: { ...createdUser }
                }
            })

            localStorage.setItem("auth-token", encodedToken);
            localStorage.setItem("user-data", JSON.stringify(createdUser));

            navigate(location?.state?.from ? location.state.from : -1, {replace: true});
            toast.success("Account created successfully");
        } catch (error) {
            console.log("SIGNUP_ERROR: ", error);
            if (error.message.includes(422)) {
                toast.error("Email already exists. Login instead")
                return;
            }
            
            toast.error("Error occured while signing in.");
        }
    }

    return(
        <div className="auth-wr">
            <div className="auth-cn auth-cn-signup">
                <h1 className="auth-heading">Sign Up</h1>
                <form
                    className="auth-form fx-c"
                    action="submit"
                >
                    <label htmlFor="firstName">
                        <input 
                            id="firstName"
                            className="auth-inp"
                            name="firstName"
                            type="text"
                            placeholder="Firt name"
                            required
                            onChange={updateUserDetails}
                            value={firstName}
                        />
                    </label>
                    <label htmlFor="lastName" >
                        <input 
                            id="lastName"
                            className="auth-inp"
                            name="lastName"
                            type="text"
                            placeholder="Last name"
                            required
                            onChange={updateUserDetails}
                            value={lastName}
                        />
                    </label>
                    <label htmlFor="email">
                        <input 
                            id="email"
                            className="auth-inp"
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={updateUserDetails}
                            value={email}
                        />
                    </label>
                    <label htmlFor="newPassword">
                        <PasswordInput 
                            id={"newPassword"}
                            name={"password"}
                            placeholder={"New password"}
                            onChange={updateUserDetails}
                            value={password}
                        />
                    </label>
                    {
                        password.length !== 0 && 
                        password.length < 6 &&
                        <div className="auth-warning">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <p>Password should have atleast 6 characters</p>
                        </div>
                    }
                    <label htmlFor="confirmPassword">
                        <PasswordInput 
                            id={"confirmPassword"}
                            name={"confirmPassword"}
                            placeholder={"Confirm password"}
                            onChange={updateUserDetails}
                            value={confirmPassword}
                        />
                    </label>
                    {
                        confirmPassword.length > 0 &&
                        password !== confirmPassword &&
                        <div className="auth-warning">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            <p>Passwords do not match.</p>
                        </div>
                    }

                    <div className="form-btn-cn fx-c">
                        <button
                            className="auth-btn btn btn-primary btn-wt-i btn-sq"
                            type="submit"
                            onClick={signupHandler}
                        >
                            <span>Continue</span>
                            <i className="fa-solid fa-angles-right"></i>
                        </button>
                    </div>
                </form>

                <p className="auth-alt-cta fx-r fx-js-c">
                    <span>Already an user?</span> 
                    <Link 
                        to="/login" 
                        className="btn-link"
                    >
                        Login
                    </Link> 
                    <span>to your account</span>
                </p>

            </div>

        </div>
    );
}