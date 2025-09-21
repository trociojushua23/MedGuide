import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HelpSupport() {
  // Open email app
  const handleEmail = () => {
    Linking.openURL("mailto:support@medguide.com").catch(() =>
      Alert.alert("Error", "Could not open email client")
    );
  };

  // Open phone dialer
  const handleCall = () => {
    Linking.openURL("tel:+639123456789").catch(() =>
      Alert.alert("Error", "Could not open dialer")
    );
  };

  // Open FAQ webpage
  const handleFAQ = () => {
    Linking.openURL("https://yourapp.com/faq").catch(() =>
      Alert.alert("Error", "Could not open FAQ page")
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.subtitle}>We're here to help you anytime</Text>

      <TouchableOpacity style={styles.card} onPress={handleEmail}>
        <Ionicons name="mail-outline" size={24} color="#0ea5e9" />
        <Text style={styles.text}>Email Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleCall}>
        <Ionicons name="call-outline" size={24} color="#0ea5e9" />
        <Text style={styles.text}>Call Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleFAQ}>
        <Ionicons name="help-circle-outline" size={24} color="#0ea5e9" />
        <Text style={styles.text}>Visit FAQ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafe",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
    color: "#0ea5e9",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});
