import React from "react";
import { View } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes() {
  const isAuthenticated = false;
  const loading = false;

  //se estiver logado AppRoutes e se não estiver AuthRoutes
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
