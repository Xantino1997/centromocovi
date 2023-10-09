import {createContext, useState} from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [userInfo,setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
// =======
// import React, { createContext, useState, useContext } from 'react';

// // Creamos el contexto
// const UserContext = createContext();

// // Creamos el proveedor del contexto
// const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Creamos un hook personalizado para acceder al contexto más fácilmente
// const useUserContext = () => useContext(UserContext);

// export { UserContext, UserProvider, useUserContext };
// >>>>>>> 37c2c2505fb9bb7e0a2143406f03857d08b97dfd
