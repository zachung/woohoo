import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import styles from "../Styles";
import storage from "../Storage";
import { Navigation } from "react-native-navigation";

interface Record {
  amount: number,
  time: number,
  desc: string | null,
}

const AddRecord = (props: { componentId: string }) => {
  const database = storage.database();

  let time = new Date().getTime();
  let number = Math.floor(Math.random() * 1000 - Math.random() * 1000);
  const [amount, onChangeAmount] = React.useState<string>(number.toString());
  const [desc, onChangeDesc] = React.useState<string>(time.toString());

  const submit = function() {
    const record: Record = {
      desc: desc,
      amount: Number(amount),
      time: time
    };
    database
      .ref("/record")
      .push(record);
    Navigation.dismissModal(props.componentId);
  };

  return (
    <View style={styles.root}>
      <Text>Add Record</Text>
      <View>
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          value={amount}
          placeholder="Amount"
          keyboardType="numeric"
        />
      </View>
      <View>
        <Text>Desc</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeDesc}
          value={desc}
          placeholder="Desc"
        />
      </View>
      <Button
        title="送出"
        color="#710ce3"
        onPress={submit} />
    </View>
  );
};

export default AddRecord;
