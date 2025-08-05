import { View, Text, Button, StyleSheet, Alert, } from "react-native";
import React, { useState } from "react";
import { markItemCompleted, deleteBucketItem, BucketItem, } from "../DbService";
import { useNavigation, useRoute } from "@react-navigation/native";

const DetailsScreen = () => {
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();
  const [item, setItem] = useState<BucketItem>(params.item);

  const handleMark = async () => {
    if (!item.id) return;
    try {
      await markItemCompleted(item.id);
      setItem({ ...item, isCompleted: true });
    } catch {
      Alert.alert("Error", "Could not mark completed.");
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete?", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (!item.id) return;
          await deleteBucketItem(item.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Due: {item.due}</Text>
      <Text>Priority: {item.priority ? "Yes" : "No"}</Text>

      <View style={styles.btnWrap}>
        <Button
          title={item.isCompleted ? "Already Done" : "Mark Completed"}
          onPress={handleMark}
          disabled={item.isCompleted}
          color={item.isCompleted ? "#999" : "green"}
        />
      </View>

      <View style={styles.btnWrap}>
        <Button title="Delete Item" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 12 
  },
  btnWrap: { 
    marginTop: 20 
  },
});
