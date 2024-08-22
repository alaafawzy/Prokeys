import React, { createContext, useState, useEffect } from 'react';
import { checkAuthStatus } from '../../Api'; // Adjust the import path if necessary

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await checkAuthStatus();
      if(userData.status==200){
        setUser(userData);
      }
      
      console.log(userData);
      // setLoading(false);
    };

    fetchUserData();
  }, []);
  // setUser({first_name:"alaa",last_name:"fawzy",email:"alaafawzy963@gmail.com"})
  return (
    <UserContext.Provider value={{ user,setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
