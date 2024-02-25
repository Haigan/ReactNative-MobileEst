import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/Signin";

//criando o stack
const Stack = createNativeStackNavigator();

//Usuários não logados podem acessar
function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }} //para tirar o Header
      />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
