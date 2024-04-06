import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [userID, setUserID] = useState();

   const updateUserID = () => {
    const id = JSON.parse(localStorage.getItem('currentUser')).id;
    setUserID(id);
  };

  return (
    <UserContext.Provider value={{ userID, updateUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
