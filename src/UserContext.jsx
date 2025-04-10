import { createContext, useContext, useState } from "react";

// Create User Context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);

// Provider component to wrap the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
