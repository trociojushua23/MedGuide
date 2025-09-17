import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Configure notification handling
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MedicineReminder() {
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState(""); // Format: "HH:MM" (24h)
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    // Request permission for notifications
    const requestPermission = async () => {
      if (Device.isDevice) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission required", "Enable notifications in settings.");
        }
      }
    };
    requestPermission();
  }, []);

  const scheduleReminder = async () => {
    if (!medicine.trim() || !dosage.trim() || !time.trim()) {
      Alert.alert("⚠️ Missing Info", "Please fill out all fields.");
      return;
    }

    try {
      const [hour, minute] = time.split(":").map(Number);

      const trigger = new Date();
      trigger.setHours(hour);
      trigger.setMinutes(minute);
      trigger.setSeconds(0);

      // If time already passed today, schedule for tomorrow
      if (trigger < new Date()) {
        trigger.setDate(trigger.getDate() + 1);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "💊 Medicine Reminder",
          body: `Time to take ${dosage} of ${medicine}`,
        },
        trigger,
      });

      const newReminder = { medicine, dosage, time };
      setReminders([...reminders, newReminder]);
      setMedicine("");
      setDosage("");
      setTime("");

      Alert.alert("✅ Reminder Set", `Reminder for ${medicine} at ${time}`);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not schedule reminder.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💊 Medicine Reminder</Text>
      <Text style={styles.subtitle}>
        Set reminders for your medications with dosage and time.
      </Text>

      <TextInput
        placeholder="Medicine name (e.g., Paracetamol)"
        value={medicine}
        onChangeText={setMedicine}
        style={styles.input}
      />

      <TextInput
        placeholder="Dosage (e.g., 500mg)"
        value={dosage}
        onChangeText={setDosage}
        style={styles.input}
      />

      <TextInput
        placeholder="Time (HH:MM, 24-hour)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={scheduleReminder}>
        <Text style={styles.buttonText}>Set Reminder</Text>
      </Pressable>

      {reminders.length > 0 && (
        <View style={styles.reminderList}>
          <Text style={styles.reminderTitle}>📋 Your Reminders:</Text>
          {reminders.map((r, idx) => (
            <Text key={idx} style={styles.reminderItem}>
              • {r.time} – {r.medicine} ({r.dosage})
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
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
    marginBottom: 15,
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  reminderList: {
    width: "90%",
    marginTop: 20,
    backgroundColor: "#e6f7ff",
    padding: 15,
    borderRadius: 10,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reminderItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});
