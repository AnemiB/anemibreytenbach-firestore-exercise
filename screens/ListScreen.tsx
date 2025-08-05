import { SafeAreaView, StyleSheet, Text, ScrollView, TouchableOpacity, } from "react-native";
import React, { useState, useCallback } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, } from "@react-navigation/native";
import { getMyBucketList, BucketItem, } from "../DbService";

const ListScreen = () => {
  const navigation = useNavigation<any>();
  const [items, setItems] = useState<BucketItem[]>([]);

  const load = async () => {
    const data = await getMyBucketList();
    setItems(data);
  };

  useFocusEffect(useCallback(() => {
    load();
  }, []));

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add")}
      >
        <Entypo name="bucket" size={18} color="green" />
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>

      <ScrollView>
        {items.length > 0 ? (
          items.map((it) => (
            <TouchableOpacity
              key={it.id}
              style={styles.card}
              onPress={() => navigation.navigate("Details", { item: it })}
            >
              <Text
                style={
                  it.isCompleted
                    ? { textDecorationLine: "line-through", color: "#999" }
                    : {}
                }
              >
                {it.title}
              </Text>
              {it.priority && <AntDesign name="star" size={20} color="orange" />}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            No items found.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 20 
},
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "green",
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
    justifyContent: "center",
  },
  addText: { 
    color: "green", 
    marginLeft: 8, 
    fontWeight: "bold" 
},
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
  },
});
