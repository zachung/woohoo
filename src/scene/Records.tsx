import React, { useEffect, useState } from "react";
import { Button, FlatList, ListRenderItem, Text, View } from "react-native";
import storage from "../Storage";
import { Navigation } from "react-native-navigation";

interface Record {
  amount: number,
  time: number,
  desc: string | null,
}

interface List {
  id: string,
  record: Record
}

const Records = function(props: { name: string, componentId: string }) {
  const [mounted, setMounted] = useState(false);
  const [list, setList] = useState<List[]>([]);

  const database = storage.database();
  if (!mounted) {
    database
      .ref("/record")
      .on("value", snapshot => {
        let val = snapshot.val() || {};
        setList(
          Object.keys(val)
            .map((key) => {
              return {
                id: key,
                record: val[key] as Record
              } as List;
            })
        );
      });
  }
  useEffect(() => {
    setMounted(true);
  });

  const Item = (props: { record: Record }) => (
    <View>
      <Text>{props.record.desc}</Text>
    </View>
  );

  const renderItem: ListRenderItem<List> = ({ item }) => (
    <Item record={item.record} />
  );

  const SettingButton = function() {
    return (
      <Button
        title="添加記錄"
        color="#710ce3"
        onPress={() => Navigation.showModal({
          stack: {
            children: [
              {
                component: {
                  name: "AddRecord",
                  options: {
                    topBar: {
                      title: {
                        text: "添加記錄"
                      }
                    }
                  }
                }
              }
            ]
          }
        })}
      />
    );
  };

  return (
    <View>
      <Text>{props.name}</Text>
      <Text>Board:</Text>
      <SettingButton />
      <FlatList<List>
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Records;
