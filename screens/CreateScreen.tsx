import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text, Switch, } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNewBucketItem, BucketItem } from "../DbService";

const CreateScreen = () => {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);

  const handleCreation = async () => {
    const newItem: BucketItem = { title, due, description, priority, isCompleted: false, };

    try {
      await createNewBucketItem(newItem);
      navigation.goBack();
    } catch {
      console.warn("Failed to create item");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Due date"
        value={due}
        onChangeText={setDue}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.row}>
        <Switch value={priority} onValueChange={setPriority} />
        <Text style={{ marginLeft: 8 }}>Priority?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCreation}>
        <Text style={styles.btnText}>Create Bucket Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    flex: 1 
},
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    padding: 10,
    marginVertical: 8,
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: 8 
},
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 4,
    marginTop: 20,
  },
  btnText: { 
    color: "white", 
    textAlign: "center", 
    fontWeight: "bold" 
},
});
