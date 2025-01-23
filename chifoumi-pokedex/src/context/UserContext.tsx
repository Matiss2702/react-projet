import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextProps {
  userId: string | null;
  setUserId: (id: string | null) => void;
  clearUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId;
  });

  const saveUserId = (id: string | null) => {
    if (id) {
      localStorage.setItem("userId", id);
    } else {
      localStorage.removeItem("userId");
    }
    setUserId(id);
  };

  const clearUser = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUserId(localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <UserContext.Provider value={{ userId, setUserId: saveUserId, clearUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
