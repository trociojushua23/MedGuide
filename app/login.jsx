// File: app/Login.jsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DisclaimerModal from "../components/DisclaimerModal";
 // ✅ import modal

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false); // ✅ toggle modal
  const [pendingUser, setPendingUser] = useState(null); // hold user data before agree

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const key = `user_${email.toLowerCase()}`;
      const userData = await AsyncStorage.getItem(key);

      if (!userData) {
        Alert.alert("User not found", "Please sign up first.");
        return;
      }

      const user = JSON.parse(userData);

      if (user.password !== password.trim()) {
        Alert.alert("Incorrect password", "Please try again.");
        return;
      }

      // Store user temporarily until disclaimer is accepted
      setPendingUser(user);
      setShowDisclaimer(true);

    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("❌ Error", "Something went wrong while logging in.");
    }
  };

  // ✅ When user agrees on disclaimer
  const handleAgree = async () => {
    try {
      if (pendingUser) {
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(pendingUser));
        Alert.alert("✅ Login successful", `Welcome back, ${pendingUser.name}!`);
      }
      setShowDisclaimer(false);
      router.replace("/home"); // redirect to home.jsx
    } catch (err) {
      console.error("Session save error:", err);
      Alert.alert("❌ Error", "Failed to save session.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏥 MedGuide</Text>
      <Text style={styles.subtitle}>Caring for your health, anytime</Text>

      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </Pressable>

      {/* ✅ Disclaimer Modal */}
      <DisclaimerModal visible={showDisclaimer} onAgree={handleAgree} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f8f7ff" },
  header: { fontSize: 28, fontWeight: "bold", marginBottom: 5, color: "#5a48d8" },
  subtitle: { fontSize: 14, marginBottom: 25, color: "#666" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
  input: {
    width: "90%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    width: "90%",
    backgroundColor: "#5a48d8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  link: { color: "#5a48d8", marginTop: 15, textDecorationLine: "underline", fontSize: 15 },
});
