import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({ username: "", name: "" });
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <DataContext.Provider
        value={{
          account,
          setAccount,
          darkMode,
          setDarkMode,
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
};

export default DataProvider;
