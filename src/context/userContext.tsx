import React, { createContext } from "react";



interface IProps {
  children: JSX.Element;
};

interface IUser {
  _id: string,
  accessToken: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  phone: string,
  roles: string[],
  address: {
    city: string,
    country: string,
    addressLine1: string,
    addressLine2: string,
  }
}

interface IUserContext {
  user: IUser | null,
}

export const UserContext = createContext<IUserContext>({
  user: null, // начальное значение в контексте(как в useState)
});


export const UserContextProvider = (prosp: IProps) => {
  const userInfo = localStorage.getItem('user');
  const user = userInfo !== null ? JSON.parse(userInfo) : null;
  return (
    <UserContext.Provider value={{ user: user }}>  
      {prosp.children}
    </UserContext.Provider>
  )
}

// <UserContext.Provider value={{ user: user }}>   --- value это то что мы передаем для видимости все что надо сделать видимым для детей компонентов
// получаем обратно через const {user} = useContext(необходимый компонент из контекста потипу UserContext)