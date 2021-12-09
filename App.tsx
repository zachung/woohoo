import React from "react";
import { Text, View } from "react-native";
import GoogleSignIn from "./src/GoogleSignIn";
import styles from "./src/Styles";

const App = function App() {
  return (
    <View style={styles.mainView}>
      <Text />
      <Text />
      <Text />
      <Text>Hello Woohoo!</Text>
      <GoogleSignIn />
    </View>
  );
};

export default App;
