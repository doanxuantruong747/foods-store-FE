
import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../untils/jwt"
// import { useSelector } from "react-redux";

const initialState = {
    isInitialized: false,
    isAuthenticated: false,
    user: null,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE:
            const { isAuthenticated, user } = action.payload;
            return {
                ...state,
                isInitialized: true,
                isAuthenticated,
                user,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case UPDATE_PROFILE:
            const {
                name,
                avatarUrl,
                address,

            } = action.payload;
            return {
                ...state,
                user: {
                    ...state.user,
                    name,
                    avatarUrl,
                    address,
                },
            };
        default:
            return state;
    }
};

const setSession = (accessTonken) => {
    if (accessTonken) {
        window.localStorage.setItem("accessTonken", accessTonken);
        apiService.defaults.headers.common.Authorization = `Bearer ${accessTonken}`;
    } else {
        window.localStorage.removeItem("accessTonken");
        delete apiService.defaults.headers.common.Authorization;
    }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    //const updatedProfile = useSelector((state) => state.user.updatedProfile);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessTonken = window.localStorage.getItem("accessTonken");

                if (accessTonken && isValidToken(accessTonken)) {
                    setSession(accessTonken);

                    const response = await apiService.get("/users/me");
                    const user = response.data;

                    dispatch({
                        type: INITIALIZE,
                        payload: { isAuthenticated: true, user },
                    });
                } else {
                    setSession(null);

                    dispatch({
                        type: INITIALIZE,
                        payload: { isAuthenticated: false, user: null },
                    });
                }
            } catch (err) {
                console.error(err);

                setSession(null);
                dispatch({
                    type: INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    // useEffect(() => {
    //     if (updatedProfile)
    //         dispatch({ type: UPDATE_PROFILE, payload: updatedProfile });
    // }, [updatedProfile]);

    const login = async ({ email, password }, callback) => {
        const response = await apiService.post("/auth/login", { email, password });
        const { user, accessTonken } = response.data;

        setSession(accessTonken);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user },
        });

        callback();
    };

    const register = async ({ name, email, password }, callback) => {
        const response = await apiService.post("/users", {
            name,
            email,
            password,
        });

        const { user, accessTonken } = response.data;
        setSession(accessTonken);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: { user },
        });

        callback();
    };

    const logout = async (callback) => {
        setSession(null);
        dispatch({ type: LOGOUT });
        callback();
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
