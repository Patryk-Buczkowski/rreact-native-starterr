import { createHabit } from "@/lib/appwrite";
import { Habit } from "@/types/type_habit";
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, HelperText } from "react-native-paper";

export default function Index() {
  const newData: Habit = {
    description: "opis",
    frequency: "daily",
    last_completed: "yest",
    streak_count: 1,
    title: "title",
    user_id: "silk",
    created_at: "today",
  };

  const [messsage, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      await createHabit(newData).then(() => setMessage("data sent"));

      
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <View style={styles.home}>
      <Text style={styles.login}>served info 😎😂</Text>
      <Button mode="outlined" onPress={handleSubmit}>
        send data
      </Button>
      {messsage && <HelperText type="info">{messsage}</HelperText>}
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    width: 100,
    borderRadius: 8,
    height: 25,
    borderWidth: 1,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "navy",
    borderColor: "yellow",
    color: "green",
    marginBottom: 10,
  },
});
