import { createContext, useContext, useState } from "react";
import { basicAuthApiService } from "../api/HelloWorldService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}) {
    let [isAuthenticated, setAuthenticated]  = useState(false);
    let [username, setUsername] = useState(null);
    let [authToken, setAuthToken] = useState(null);

    async function login(loginInfo) {

        const token = 'Basic '+ window.btoa(loginInfo.username + ':' + loginInfo.password)

        try {
        const response = await basicAuthApiService(token)

        if(response.status===200) {
            setAuthenticated(true);
            setUsername(loginInfo.username);
            setAuthToken(token)

            apiClient.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = token
                    return config
                }
            )

            return true;    
          } else {
            logout()
            return false;
          }
        } catch (error) {
            logout()
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
        setUsername(null);
        setAuthToken(null);
    }
    

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout, username, authToken} }>
            {children}
        </AuthContext.Provider>
    )
}   