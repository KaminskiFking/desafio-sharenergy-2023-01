import { useEffect, useState} from "react";
import { api } from "../services/api";
import { ReactContext } from "./ReactContext";


function ReactProvider({ children }: any) {
  const [signIn, setSignIn]: any = useState('');
  const [user, setUser]: any = useState('');
  const [signed, setSigned]: any = useState('');


  useEffect(() => {
    const loadingStorageData = async () => {
      const storageUser = localStorage.getItem('token');
      if(storageUser) {
        setUser(storageUser)
      }
    };
    loadingStorageData();
  }, [])

  const SignIn = async ({username, password }) => {
    const response = await api.post("/login", {
      username,
      password
    });
    const { token } = response.data;
    setUser(token);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`
    localStorage.setItem("token", token);
  }

  const contextValue = {
    user,
    signed: !!user,
    signIn,
    SignIn,
    setSignIn,
    setSigned,
  };

  return (
    <ReactContext.Provider value={ contextValue }>
      {children}
    </ReactContext.Provider>
  );
}

export default ReactProvider;
