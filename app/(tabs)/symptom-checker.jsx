import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { useRouter, Stack } from "expo-router";  // 👉 Import Stack for title

// 👉 Function to check symptoms
function getSymptomAdvice(symptom) {
  if (!symptom.trim()) {
    return "⚠️ Please enter your symptoms to get advice.";
  }

  const s = symptom.toLowerCase();

  if (s.includes("fever")) {
    return "🤒 You may have an infection. Stay hydrated and consider seeing a doctor if it persists.";
  } else if (s.includes("headache")) {
    return "💆 Headaches can be caused by stress or dehydration. Rest, drink water, and monitor.";
  } else if (s.includes("cough")) {
    return "😷 Persistent cough may indicate flu or respiratory issues. Monitor your temperature.";
  } else {
    return "ℹ️ Symptom not recognized. Please consult a healthcare provider for accurate advice.";
  }
}

export default function SymptomChecker() {
  const router = useRouter(); // 👉 initialize router
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState("");

  const handleCheck = () => {
    const advice = getSymptomAdvice(symptom);
    setResult(advice);
  };

  return (
    <>
      {/* 👉 This will update the tab title */}
      <Stack.Screen options={{ title: "Symptom Checker" }} />

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>🩺 Symptom Checker</Text>
          <Text style={styles.subtitle}>
            Enter your symptoms below to get basic health guidance.
          </Text>

          <TextInput
            placeholder="Type your symptom here..."
            value={symptom}
            onChangeText={setSymptom}
            style={styles.input}
          />

          <Pressable style={styles.button} onPress={handleCheck}>
            <Text style={styles.buttonText}>Check Symptoms</Text>
          </Pressable>

          {result ? (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>{result}</Text>
            </View>
          ) : null}

          {/* 👉 Back to Home button */}
          <Pressable 
            style={[styles.button, { backgroundColor: "#2d6a4f", marginTop: 20 }]} 
            onPress={() => router.replace("home")}   // adjust kung asa imo home file
          >
            <Text style={styles.buttonText}>⬅️ Back to Home</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d6a4f",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: "90%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#1d9bf0",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    width: "90%",
    backgroundColor: "#1d9bf0",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  resultBox: {
    width: "90%",
    backgroundColor: "#e6f7ff",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#1d9bf0",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
});
