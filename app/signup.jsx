import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
        password,
      });

      // ✅ Save user with Firestore ID
      const newUser = { id: docRef.id, name, email, password };
      await AsyncStorage.setItem("currentUser", JSON.stringify(newUser));

      Alert.alert("Success", "Account created successfully!");
      router.replace("/login");
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Failed to sign up");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f9fafe" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#0ea5e9" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16 },
  signupBtn: { backgroundColor: "#0ea5e9", padding: 15, borderRadius: 10, alignItems: "center" },
  signupText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
