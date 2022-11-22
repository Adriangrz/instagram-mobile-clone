import React, { useEffect } from 'react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { getValueFromSecureStoreFor, storeItemInSecureStore } from '../utilities/secureStorage';

type Props = {
  children: ReactNode;
};

export interface AuthContext {
  setCredentials: (token?: string) => void;
  token: string | null;
}

export const AuthContext = createContext<AuthContext>({
  setCredentials(token?: string) {
    return;
  },
  token: null,
});

export const AuthContextProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const asyncEffect = async () => {
      const token = await getValueFromSecureStoreFor('accees_token');
      if (token) {
        setToken(token);
      }
    };
    asyncEffect();
  }, []);

  const setCredentials = (token?: string) => {
    if (token) {
      setToken(token);
      storeItemInSecureStore('accees_token', token);
    }
  };

  return <AuthContext.Provider value={{ token, setCredentials }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);
export default useAuth;
