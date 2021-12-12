import React, { useState } from "react";
import { Text } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "@react-native-google-signin/google-signin";
import { User } from "./types";
import styles from "./Styles";

const GoogleSignIn = function(props: { afterSignIn: (user: User) => void }) {
  const [msg, setMsg] = useState("");

  GoogleSignin.configure();

  // Somewhere in your code
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      props.afterSignIn(userInfo.user as User);
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

  return (
    <>
      <GoogleSigninButton
        onPress={() => onGoogleButtonPress().then(() => console.log("Signed in with Google!"))}
      />
      <Text style={styles.innerText}>{msg}</Text>
    </>
  );
};

export default GoogleSignIn;
