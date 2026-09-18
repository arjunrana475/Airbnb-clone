import React, { createContext } from 'react'
import { authDataContext } from './AuthContext';

export const authDataContext = createContext();

function AuthContext({ children }) {
    const serverUrl = "http://localhost:3000/api";
    let value = {
        serverUrl
    }
    return (
        <div>
            <authDataContext.Provider value={value}>
               {children}
            </authDataContext.Provider>
        </div>
    );
}

export default AuthContext;
