import { createContext } from 'react';

export type AuthContextType = {
  user: any,
  signed: any,
  signIn: any,
  setSignIn: any,
  setSigned: any,
  SignIn: any;
}

export const ReactContext = createContext<AuthContextType>(null!);