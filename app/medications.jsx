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

export default function Medications() {
  const [time, setTime] = useState("");
  const [medications, setMedications] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Add or update medication time
  const handleSave = () => {
    if (!time.trim()) {
      Alert.alert("⚠️ Input Required", "Please enter a time (e.g. 08:00 AM).");
      return;
    }

    if (editingIndex !== null) {
      // Update
      const updated = [...medications];
      updated[editingIndex] = time;
      setMedications(updated);
      setEditingIndex(null);
      Alert.alert("✅ Updated", "Medication time updated successfully.");
    } else {
      // Add
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>💊 Medication Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter time (e.g. 08:00 AM)"
        value={time}
        onChangeText={setTime}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {editingIndex !== null ? "Update Time" : "Add Time"}
        </Text>
      </Pressable>

      <View style={styles.listContainer}>
        {medications.map((med, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.listText}>{med}</Text>
            <View style={styles.actions}>
              <Pressable
                style={[styles.smallButton, { backgroundColor: "#4CAF50" }]}
                onPress={() => handleEdit(index)}
              >
                <Text style={styles.smallText}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.smallButton, { backgroundColor: "#F44336" }]}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.smallText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    marginTop: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  listText: {
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  smallText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
