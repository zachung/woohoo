import React, { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { useState } from "react";
import styles from "./Styles";
import { User } from "./types";
import storage from "./Storage";

interface Message {
  name: string,
  text: string,
  time: number,
}

const Messenger = function(props: { user: User }) {
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<{ [key: string]: Message }>({});

  const database = storage.database();
  if (!mounted) {
    database
      .ref("/messages")
      .orderByChild("time")
      .limitToLast(10)
      .on("child_added", snapshot => {
        let message = snapshot.val() as Message;
        setMessages((messages) => ({
          ...messages, [`${snapshot.key}`]: message
        }));
      });
  }
  useEffect(() => {
    setMounted(true);
  });

  const submitMessage = function() {
    let message: Message = {
      name: props.user.name,
      text,
      time: new Date().getTime()
    };
    database
      .ref("/messages")
      .push(message);
    setText("");
  };

  return (
    <>
      <TextInput style={styles.input}
                 placeholder="Send message.."
                 onChangeText={text => setText(text)}
                 onSubmitEditing={submitMessage}
                 value={text} />
      {
        Object.entries(messages || {})
          .reverse()
          .map(([key, message]) => {
            return (
              <Text key={key}>- {message.name}({new Date(message.time).toLocaleTimeString()}): {message.text}</Text>
            );
          })
      }
    </>
  );
};
export default Messenger;
