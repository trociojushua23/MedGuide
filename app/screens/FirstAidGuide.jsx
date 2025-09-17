// File: screens/FirstAidGuide.jsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FirstAidGuide = () => {
  const guides = [
    {
      title: "CPR (Cardiopulmonary Resuscitation)",
      steps: [
        "Check responsiveness and breathing.",
        "Call emergency services immediately.",
        "Push hard and fast in the center of the chest (100-120 compressions per minute).",
        "Give rescue breaths if trained (30 compressions : 2 breaths).",
      ],
      icon: "heart",
    },
    {
      title: "Choking",
      steps: [
        "Ask the person if they are choking.",
        "If unable to speak/cough, perform abdominal thrusts (Heimlich maneuver).",
        "If unresponsive, start CPR and call emergency services.",
      ],
      icon: "warning",
    },
    {
      title: "Burns",
      steps: [
        "Cool the burn with running water for at least 10 minutes.",
        "Do not apply ice, butter, or toothpaste.",
        "Cover with a clean, non-stick dressing.",
        "Seek medical help if severe.",
      ],
      icon: "flame",
    },
    {
      title: "Severe Bleeding",
      steps: [
        "Apply firm pressure with a clean cloth or bandage.",
        "Do not remove the cloth even if soaked; add more layers.",
        "Keep the injured limb elevated if possible.",
        "Call emergency services immediately.",
      ],
      icon: "medkit",
    },
    {
      title: "Fractures",
      steps: [
        "Immobilize the injured area using a splint or sling.",
        "Do not try to straighten bones.",
        "Apply ice packs wrapped in cloth to reduce swelling.",
        "Seek urgent medical attention.",
      ],
      icon: "bandage",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🩺 First Aid Guide</Text>

      {guides.map((guide, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name={guide.icon} size={24} color="#0ea5e9" />
            <Text style={styles.title}>{guide.title}</Text>
          </View>
          {guide.steps.map((step, i) => (
            <Text key={i} style={styles.step}>
              • {step}
            </Text>
          ))}
        </View>
      ))}

      <Text style={styles.disclaimer}>
        ⚠️ Disclaimer: This guide is for basic first aid awareness only. Always
        seek professional medical help in emergencies.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0ea5e9",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: "#1e293b",
  },
  step: {
    fontSize: 14,
    color: "#475569",
    marginVertical: 2,
    lineHeight: 20,
  },
  disclaimer: {
    fontSize: 13,
    color: "#ef4444",
    marginTop: 10,
    textAlign: "center",
  },
});

export default FirstAidGuide;
