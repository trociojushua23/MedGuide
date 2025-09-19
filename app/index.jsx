// File: app/index.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function LandingPage() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#e6e9ff", "#f9faff", "#fff"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.inner}>
          {/* App Name */}
          <Text style={styles.title}>🏥 MedGuide</Text>
          <Text style={styles.subtitle}>
            Caring for your health, anytime 💊
          </Text>

          {/* Auth Buttons */}
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.signUpButton]}
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
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#3b61ecff",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
    width: 220,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
  authButtonsContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#34c759", // green for sign up
  },
  loginButton: {
    backgroundColor: "#3b61ecff", // purple for login
  },
});
