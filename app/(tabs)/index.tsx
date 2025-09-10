import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.home}>
      <Text>Index pagee</Text>
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
  },
});
