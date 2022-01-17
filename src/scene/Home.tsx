import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import GoogleSignIn from "../GoogleSignIn";
import styles from "../Styles";
import { User } from "../types";
import AfterSignIn from "../AfterSignIn";
import EmailSignIn from "../EmailSignIn";
import { Navigation } from "react-native-navigation";

const Home = function(props: { componentId: string }) {
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

  const SettingButton = function() {
    return (
      <Button
        title="Push Settings Screen"
        color="#710ce3"
        onPress={() => Navigation.push(props.componentId, {
          component: {
            name: "Settings",
            options: {
              topBar: {
                title: {
                  text: "Settings"
                }
              }
            }
          }
        })} />
    );
  };

  return (
    <View style={styles.root}>
      <SettingButton />
      <Text>Hello Woohoo!</Text>
      <SignPanel />
    </View>
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
