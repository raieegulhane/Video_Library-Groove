import "./auth.css"

export const Login = () => {
    return (
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