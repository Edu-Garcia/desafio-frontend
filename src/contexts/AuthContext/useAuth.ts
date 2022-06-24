import { useContext } from 'react';
import { AuthContext } from '.';
import { IAuthContext } from './types';

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  return context;
};
