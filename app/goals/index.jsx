import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to MedGuide</Text>

      {/* Link to Goals screen */}
      <Link href="/Goals" style={styles.link}>
        View Your Goals
      </Link>

      {/* Link to Symptom Checker screen */}
      <Link href="/SymptomCheckerScreen" style={styles.link}>
        Symptom Checker
      </Link>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  link: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0396c8",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
});
