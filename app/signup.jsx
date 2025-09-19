// File: app/Signup.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const key = `user_${email.toLowerCase()}`;
      const existingUser = await AsyncStorage.getItem(key);

      if (existingUser) {
        Alert.alert("User already exists", "Please log in instead.");
        return;
      }

      const user = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      await AsyncStorage.setItem(key, JSON.stringify(user));

      Alert.alert("✅ Account created!", "Please log in.");
      router.push("/login"); // safer than replace
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("❌ Signup failed", "Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏥 MedGuide</Text>
      <Text style={styles.subtitle}>Caring for your health, anytime</Text>

      <Text style={styles.title}>Create Your Account</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  link: { color: "#5a48d8", marginTop: 15, textDecorationLine: "underline", fontSize: 15 },
});
