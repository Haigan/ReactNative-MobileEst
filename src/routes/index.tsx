import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { AuthContext } from "../contexts/AuthContext";

function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext); //vai retonar dashboard ou encaminhar login

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#1D1D2E",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={60} color="#fff" />
      </View>
    );
  }

  //se estiver logado AppRoutes e se não estiver AuthRoutes
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
