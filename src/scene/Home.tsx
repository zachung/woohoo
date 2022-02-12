import React, { useState } from "react";
import { Text, View } from "react-native";
import GoogleSignIn from "../GoogleSignIn";
import styles from "../Styles";
import { User } from "../types";
import AfterSignIn from "../AfterSignIn";
import EmailSignIn from "../EmailSignIn";
import storage from "../Storage";

const Home = function(props: { componentId: string }) {
  // for debug

  const [isInit, setIsInit] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [user, setUser] = useState<User>();
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
      <AfterSignIn user={user} componentId={props.componentId} />
    );
  };


  storage.init().then(() => {
    setIsInit(true);
  }).catch((error: Error) => {
    setErrorMessage(error.message);
  });

  const Index = function() {
    return (
      <View style={styles.root}>
        <Text>Hello Woohoo!</Text>
        <SignPanel />
      </View>
    );
  };

  const SplashScreen = function() {
    if (!isInit) {
      return (
        <View>
          <Text>Waiting init...</Text>
          <Text>{errorMessage}</Text>
        </View>
      );
    }
    return (
      <Index />
    );
  };

  return (
    <SplashScreen />
  );
};
Home.options = {
  topBar: {
    title: {
      text: "Home"
    }
  }
};

export default Home;
