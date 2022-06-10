import React, { useState, createContext, useEffect } from 'react';
import { IAuthContext, IAuthProvider, IContextUser, ISessionResponse } from './types';
import toastMsg, { ToastType } from '../../utils/toastMsg';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider): React.ReactElement => {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<IContextUser>({} as IContextUser);

  useEffect(() => {
    const userToken = localStorage.getItem('TOKEN_KEY');
    const userId = localStorage.getItem('USER_ID');
    const userPermission = localStorage.getItem('USER_PERMISSION');

    if (userToken && userId && userPermission) {
      setToken(userToken);
      setUser({
        id: userId,
        permission: userPermission,
      });
    }
  }, []);

  const signOut = (): void => {
    setToken(null);
    setUser({ id: null, permission: null });

    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_PERMISSION');
  };

  const signIn = (data: ISessionResponse): void => {
    try {
      const { token: dataToken, user: dataUser } = data;

      setToken(dataToken);
      setUser({
        id: dataUser.id,
        permission: dataUser.permission,
      });

      localStorage.setItem('TOKEN_KEY', dataToken);
      localStorage.setItem('USER_ID', dataUser.id);
      localStorage.setItem('USER_PERMISSION', dataUser.permission);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        signed: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
