import React, { useEffect, useState } from "react";
import app from "./firebase.js";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user-data'));
  
  useEffect(() => {
    app.auth().onAuthStateChanged(setCurrentUser);
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};