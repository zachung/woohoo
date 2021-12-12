import React, { useState } from "react";
import { Text, View } from "react-native";
import GoogleSignIn from "./src/GoogleSignIn";
import styles from "./src/Styles";
import { User } from "./src/types";
import AfterSignIn from "./src/AfterSignIn";
import EmailSignIn from "./src/EmailSignIn";

const App = function() {
  // for debug
  let initialUser = { name: "test", email: "test" };

  const [user, setUser] = useState<User>(initialUser);
  const onSignIn = function(user: User) {
    setUser(user);
  };

  const SignPanel = function() {
    if (!user) {
      return <>
        <EmailSignIn afterSignIn={onSignIn} />
        <GoogleSignIn afterSignIn={onSignIn} />
      </>;
    }
    return (
      <AfterSignIn user={user} />
    );
  };

  return (
    <View style={styles.mainView}>
      <Text />
      <Text />
      <Text />
      <Text>Hello Woohoo!</Text>
      <SignPanel />
    </View>
  );
};

export default App;
