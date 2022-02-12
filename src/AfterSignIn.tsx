import React from "react";
import { Text, View } from "react-native";
import { User } from "./types";
import styles from "./Styles";
import Records from "./scene/Records";
import Messenger from "./Messenger";

const AfterSignIn = function(props: { user: User, componentId: string }) {
  const user = props.user;
  return (
    <View>
      <Text style={styles.baseText}>
        Welcome
        {user.email}
      </Text>
      <Records name={user.email} componentId={props.componentId} />
      <Messenger user={user} />
    </View>
  );
};
export default AfterSignIn;
