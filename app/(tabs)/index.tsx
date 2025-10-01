import { ScrollView, View } from "react-native";
import KeyboardWrapper from "../components/keyboardWrapper";
import { useEffect, useLayoutEffect } from "react";
import { getHabits } from "@/lib/appwrite";
import useAuthStore from "../../zustand/useAuthStore";
import useTasksStore from "../../zustand/useTasksStore";
import { Text, HelperText, Icon, Surface } from "react-native-paper";
import { useNavigation } from "expo-router";

export default function Index() {
  const { user } = useAuthStore();
  const tasks = useTasksStore((state) => state.tasks);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Today tasks ${tasks.length} elem`,
    });
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      await getHabits();
    };

    fetchTasks();
  }, [user]);

  console.log("tasks", tasks.length);

  return (
    <KeyboardWrapper style={{ justifyContent: "center" }}>
      {tasks.length === 0 ? (
        <View>
          <HelperText
            theme={{ colors: { onSurfaceVariant: "#000BB0" } }}
            type="info"
          >
            No tasks, add some tasks{" "}
          </HelperText>
        </View>
      ) : (
        <ScrollView
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: "#000428", // ciemne tło (gradient base)
          }}
        >
          {tasks.map((task, index) => (
            <Surface
              key={task.$id}
              theme={{ colors: { shadow: "#000BB0" } }}
              elevation={3}
              style={{
                marginBottom: 17,
                shadowColor: "#0015FF", // jasniejszy niebieski cień
                shadowOpacity: 0.3,
                shadowRadius: 5,
                shadowOffset: { height: 1, width: 0 },
                padding: 12,
                borderRadius: 8,
                backgroundColor: "#000BB0", // główny kolor
                borderWidth: 1,
                borderColor: "#4D5DFA", // akcent jaśniejszy
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
              >
                <Text style={{ color: "#C7D2FE", fontWeight: "bold" }}>
                  {index + 1}.
                </Text>

                <Text
                  style={{
                    color: "#E0E7FF",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
                </Text>
              </View>

              <Text
                style={{ color: "#A5B4FC", fontSize: 14, marginBottom: 5 }}
              >
                {task.description}
              </Text>

              <View style={{ flexDirection: "row", gap: 3 }}>
                <Icon color="#C7D2FE" size={20} source={"fire-circle"} />
                <Text style={{ color: "#C7D2FE" }}>
                  {task.streak_count} days streak
                </Text>
              </View>

              <View style={{ flexDirection: "row", gap: 3 }}>
                <Icon color="#C7D2FE" size={20} source={"calendar"} />
                <Text style={{ color: "#C7D2FE" }}>{task.frequency}</Text>
              </View>
            </Surface>
          ))}
        </ScrollView>
      )}
    </KeyboardWrapper>
  );
}
