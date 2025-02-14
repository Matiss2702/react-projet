import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  id: string;
  username: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(() => {
    const storedId = localStorage.getItem("userId");
    const storedUsername = localStorage.getItem("username");
    if (storedId && storedUsername) {
      return { id: storedId, username: storedUsername };
    }
    return null;
  });

  const setUser = (userData: User | null) => {
    if (userData) {
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("username", userData.username);
    } else {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
    }
    setUserState(userData);
  };

  const clearUser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    setUserState(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedId = localStorage.getItem("userId");
      const storedUsername = localStorage.getItem("username");
      if (storedId && storedUsername) {
        setUserState({ id: storedId, username: storedUsername });
      } else {
        setUserState(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <UserContext.Provider value={{ user, setUser, clearUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
