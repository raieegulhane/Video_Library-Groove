import { createContext, useContext, useReducer } from "react";
import { initialAuthData, authReducerFunction } from "../reducers";

const AuthContext = createContext(initialAuthData);

const AuthProvider = ({ children }) => {
    const getInitialAuthVAlues = () => {
        const authToken = localStorage.getItem("auth-token");
        const userData = JSON.parse(localStorage.getItem("user-data"));

        if (authToken) {
            return {
                isAuth: true,
                authToken: authToken,
                userData: userData
            }
        }

        return { ...initialAuthData };
    }

    const [ authState, authDispatch ] = useReducer(authReducerFunction, getInitialAuthVAlues());

    return(
        <AuthContext.Provider value={{ authState, authDispatch }}>
            { children }
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };