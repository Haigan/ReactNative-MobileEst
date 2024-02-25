import { View, StatusBar } from "react-native";

import SignIn from "./src/pages/Signin";

export default function App() {
  return (
    <View>
      <StatusBar
        backgroundColor="#1d1d2e"
        barStyle="light-content"
        translucent={false}
      />
      <SignIn />
    </View>
  );
}
