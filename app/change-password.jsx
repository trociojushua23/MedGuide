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

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    try {
      const storedPassword = await AsyncStorage.getItem("user_password");

      if (storedPassword !== oldPassword) {
        Alert.alert("Error", "Old password is incorrect.");
        return;
      }

      await AsyncStorage.setItem("user_password", newPassword);

      Alert.alert("Success", "Password changed successfully!", [
        {
          text: "OK",
          onPress: () => {
            router.back(); // balik sa previous page (Profile.jsx)
          },
        },
      ]);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter old password"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm new password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleChangePassword}>
        <Text style={styles.saveText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9fafe",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#0ea5e9",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#0ea5e9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
