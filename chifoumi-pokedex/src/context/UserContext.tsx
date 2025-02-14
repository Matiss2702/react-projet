import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextProps {
  userId: string | null;
  setUserId: (id: string | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserIdState] = useState<string | null>(() => {
    return localStorage.getItem("userId");
  });

  const setUserId = (id: string | null) => {
    if (id) {
      localStorage.setItem("userId", id);
    } else {
      localStorage.removeItem("userId");
    }
    setUserIdState(id);
  };

  const clearUser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserIdState(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUserIdState(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <UserContext.Provider value={{ userId, setUserId, clearUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
