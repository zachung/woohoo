import React from "react";
import { Text, View } from "react-native";
import { User } from "./types";
import styles from "./Styles";
import Firestore from "./Firestore";
import Messenger from "./Messenger";

const AfterSignIn = function(props: { user: User }) {
  const user = props.user;
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
export default AfterSignIn;
