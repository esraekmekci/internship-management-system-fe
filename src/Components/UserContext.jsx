import React, { createContext, useState, useContext, useEffect } from 'react';
import { GetWithAuth } from '../Services/HttpService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await GetWithAuth(
              `/${localStorage.getItem("role").toLowerCase()}/token/${localStorage.getItem("tokenKey")}`
            );
            const result = await response.json();
            setUser(result);
          } catch (error) {
            console.log(error);
            console.log("User not found");
          }
        };
    
        fetchData();
    
      }, [setUser]);



    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
