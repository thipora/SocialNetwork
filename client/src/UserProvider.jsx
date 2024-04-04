import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const storedUser = JSON.parse(localStorage.getItem('currentUser'))?JSON.parse(localStorage.getItem('currentUser')).id:1;

  const initialUser = {
    userID: 0,
  };
  const [userID, setUserID] = useState(storedUser);

   const updateUserID = (id) => {
    setUserID(id);
  };

  return (
    <UserContext.Provider value={{ userID, updateUserID }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
