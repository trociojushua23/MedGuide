import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      // ✅ Save session
      await AsyncStorage.setItem("loggedInUser", user.email);

      Alert.alert("✅ Login Successful", `Welcome back, ${user.name}!`);
      router.replace("/home");
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("❌ Error", "Something went wrong while logging in.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💊 Welcome Back to MedGuide</Text>

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
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff", // light medical blue
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#2d6a4f", // green health tone
  },
  input: {
    width: "90%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#1d9bf0", // healthcare blue
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "90%",
    backgroundColor: "#1d9bf0", // medical blue
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    color: "#34c759", // green (Apple Health style)
    marginTop: 15,
    textDecorationLine: "underline",
    fontSize: 15,
  },
});
