import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  CheckBox, // gamit native CheckBox
} from "react-native";

const DisclaimerModal = ({ visible, onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <SafeAreaView style={styles.modalBox}>
          <Text style={styles.title}>Please Read Carefully & Agree</Text>

          <Text style={styles.bullet}>
            • This generated analysis is for educational purposes only and may
            contain inaccuracies.
          </Text>
          <Text style={styles.bullet}>
            • Results depend on the document provided and are not a substitute
            for professional advice.
          </Text>
          <Text style={styles.bullet}>
            • For your peace of mind and well-being, consult a doctor before
            making health decisions.
          </Text>

          <Text style={styles.subtitle}>Privacy & Data Protection:</Text>
          <Text style={styles.desc}>
            By using our service, you agree to our privacy policy, compliant with
            global data protection laws, including DPDP, CCPA, GDPR, PIPEDA,
            APPI, and PDPA.
          </Text>

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{ true: "#2563eb", false: "#999" }}
            />
            <Text style={styles.checkboxLabel}>
              I have read and agree to the terms above.
            </Text>
          </View>

          {/* Agree button */}
          <TouchableOpacity
            style={[
              styles.agreeButton,
              { backgroundColor: isChecked ? "#2563eb" : "#ccc" },
            ]}
            onPress={onAgree}
            disabled={!isChecked}
          >
            <Text style={styles.agreeText}>Agree & Continue</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
    color: "#111",
  },
  bullet: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 15,
    color: "#111",
  },
  desc: {
    fontSize: 13,
    color: "#444",
    marginTop: 4,
    marginBottom: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 13,
    color: "#333",
    marginLeft: 8,
    flexShrink: 1,
  },
  agreeButton: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  agreeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default DisclaimerModal;
