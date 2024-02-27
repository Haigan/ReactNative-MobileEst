import React, { useState, createContext, ReactNode, useEffect } from "react";

//para manter o usuário logado msm fechando o App
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../services/api";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (Credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
};
type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  //se for autenticado passa a valer true
  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function getUser() {
      //pegar dados salvos do user
      const userInfo = await AsyncStorage.getItem("@estabelecimento");
      let hasUser: UserProps = JSON.parse(userInfo || "{}");

      //verificar se recebemos as informações
      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }
      setLoading(false);
    }

    getUser();
  }, []);

  //contexto para requisição
  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    // REQUISIÇÃO DE LOGIN
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      //pegando dados de retorno
      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      //salvando no async storage
      await AsyncStorage.setItem("@estabelecimento", JSON.stringify(data));

      //informando token por padrão
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      //adicionando ao useState
      setUser({
        id,
        name,
        email,
        token,
      });

      setLoadingAuth(false);
    } catch (err) {
      console.log("Erro ao acessar ", err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
