import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router"; // ✅ add Stack

export default function Medications() {
  const [time, setTime] = useState("");
  const [medications, setMedications] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const router = useRouter(); // ✅ initialize router

  // Add or update medication time
  const handleSave = () => {
    if (!time.trim()) {
      Alert.alert("⚠️ Input Required", "Please enter a time (e.g. 08:00 AM).");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...medications];
      updated[editingIndex] = time;
      setMedications(updated);
      setEditingIndex(null);
      Alert.alert("✅ Updated", "Medication time updated successfully.");
    } else {
      setMedications([...medications, time]);
      Alert.alert("✅ Added", "Medication time added successfully.");
    }

    setTime("");
  };

  // Edit existing time
  const handleEdit = (index) => {
    setTime(medications[index]);
    setEditingIndex(index);
  };

  // Delete time
  const handleDelete = (index) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
    Alert.alert("🗑️ Deleted", "Medication time removed.");
  };

  return (
    <>
      {/* ✅ This sets the browser tab + header title */}
      <Stack.Screen options={{ title: "Medications" }} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="medkit" size={40} color="#2196F3" />
          <Text style={styles.header}>Medication Reminder</Text>
          <Text style={styles.subHeader}>💊 Manage your daily pill times</Text>
        </View>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter time (e.g. 08:00 AM)"
            value={time}
            onChangeText={setTime}
          />
          <Pressable style={styles.addButton} onPress={handleSave}>
            <Text style={styles.addButtonText}>
              {editingIndex !== null ? "Update" : "Add"}
            </Text>
          </Pressable>
        </View>

        {/* List */}
        <Text style={styles.sectionTitle}>Today’s Medications</Text>
        <View style={styles.listContainer}>
          {medications.length === 0 ? (
            <Text style={styles.emptyText}>No medications added yet.</Text>
          ) : (
            medications.map((med, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardLeft}>
                  <Ionicons name="pill" size={28} color="#1e90ff" />
                  <View>
                    <Text style={styles.cardTitle}>Pill #{index + 1}</Text>
                    <Text style={styles.cardSubtitle}>{med}</Text>
                  </View>
                </View>
                <View style={styles.cardActions}>
                  <Pressable
                    style={[styles.iconButton, { backgroundColor: "#4CAF50" }]}
                    onPress={() => handleEdit(index)}
                  >
                    <Ionicons name="create" size={18} color="#fff" />
                  </Pressable>
                  <Pressable
                    style={[styles.iconButton, { backgroundColor: "#F44336" }]}
                    onPress={() => handleDelete(index)}
                  >
                    <Ionicons name="trash" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ✅ Back to Home Button */}
        <Pressable
          style={styles.homeButton}
          onPress={() => router.push("/home")} // balik sa home.jsx
        >
          <Text style={styles.homeButtonText}>⬅️ Back to Home</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f8ff",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
    marginTop: 10,
  },
  subHeader: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  listContainer: {
    gap: 12,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e6f0ff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 6,
  },
  emptyText: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
  homeButton: {
    marginTop: 25,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#2d6a4f",
    alignItems: "center",
  },
  homeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
