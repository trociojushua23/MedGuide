import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";


const Index = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* App Header */}
      <Text style={styles.title}>💊 MedGuide</Text>
      <Text style={styles.subtitle}>
        Your health, simplified. Stay on track with your med and well-being 🌿
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff", // light medical blue
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#2d6a4f", // greenish tone for health
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#1d9bf0", // healthcare blue
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  loginButton: {
    backgroundColor: "#34c759", // apple health green
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});
