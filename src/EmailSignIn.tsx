import React from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "./types";
import { Button } from "react-native";

const EmailSignIn = function(props: { afterSignIn: (user: User) => void }) {
  const SignIn = function() {
    auth()
      .signInWithEmailAndPassword("zach50931@hotmail.com", "123456")
      .then((userCredential: FirebaseAuthTypes.UserCredential) => {
        console.log("User account created & signed in!");
        const user = userCredential.user;
        props.afterSignIn({ name: user.email, email: user.email } as User);
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (
    <>
      <Button title="Email Sign In" onPress={SignIn} />
    </>
  );
};

export default EmailSignIn;
