import React, { createContext, useContext, useState } from 'react';

// Define your context for user email
interface MyContextType {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

// Define props for the context provider
interface MyContextProviderProps {
  children: React.ReactNode;
}

// Create a custom hook to access the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

// Create a context provider component
export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>(''); // Initialize with an empty string

  return (
    <MyContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </MyContext.Provider>
  );
};
