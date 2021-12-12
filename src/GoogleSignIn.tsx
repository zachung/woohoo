import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin";
import Firestore from "./Firestore";
import styles from "./Styles";
import { User } from "./types";
import Messenger from "./Messenger";

const GoogleSignIn = function() {
  // for debug
  let initialUser = { name: "test", email: "test" };

  const [user, setUser] = useState<User>(initialUser);
  const [msg, setMsg] = useState("");

  GoogleSignin.configure();

  // Somewhere in your code
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo.user as User);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setMsg("user cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setMsg("operation (e.g. sign in) is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setMsg("play services not available or outdated");
      } else {
        setMsg("some other error happened");
      }
    }
  };

  const UserInfo = function() {
    if (!user) {
      return <Text style={styles.innerText}>{msg}</Text>;
    }
    return (
      <View>
        <Text style={styles.baseText}>
          Welcome
          {user.email}
        </Text>
        <Firestore name={user.email} />
        <Messenger user={user} />
      </View>
    );
  };

  if (user) {
    return <UserInfo />;
  }
  return (
    <GoogleSigninButton
      onPress={() => onGoogleButtonPress().then(() => console.log("Signed in with Google!"))}
    />
  );
};

export default GoogleSignIn;
