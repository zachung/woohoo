import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { User } from "@react-native-google-signin/google-signin";
import { firebase } from "@react-native-firebase/database";

interface Clicker {
  count: number;
}

const Firestore = function(props: { user: User }) {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [list, setList] = useState<{ [key: string]: Clicker }>({});
  let name = props.user.user.email.replace(".", "_");

  const database = firebase
    .app()
    .database("https://woohoo-f1e6f-default-rtdb.asia-southeast1.firebasedatabase.app/");
  if (!mounted) {
    database
      .ref("/clickers")
      .on("value", snapshot => {
        let val = snapshot.val();
        let selfClicker = val[name];
        if (selfClicker) {
          setCount(selfClicker.count);
        }
        setList(val);
      });
  }
  useEffect(() => {
    setMounted(true);
  });
  const onPress = function() {
    database
      .ref("/clickers/" + name)
      .set({ count: count + 1 })
      .then(() => console.log("Data updated."));
  };

  return (
    <View>
      <Text>{props.user.user.email}</Text>
      <Button title={"Press me"} onPress={onPress} />
      <Text>{count}</Text>
      {
        Object.entries(list)
          .map(([name, clicker]) => {
            return (
              <Text key={name}>{name}: {clicker.count}</Text>
            );
          })
      }
    </View>
  );
};

export default Firestore;
