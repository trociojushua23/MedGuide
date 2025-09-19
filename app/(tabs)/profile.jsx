import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Profile = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 28 }} /> 
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }} // placeholder image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Jushua Trocio</Text>
        <Text style={styles.profileEmail}>jushuatrocio@email.com</Text>
      </View>

      {/* Info Options */}
      <View style={styles.menu}>
        <MenuItem icon="person-outline" label="Edit Profile" />
        <MenuItem icon="lock-closed-outline" label="Change Password" />
        <MenuItem icon="notifications-outline" label="Notifications" />
        <MenuItem icon="help-circle-outline" label="Help & Support" />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => alert("Logged out!")}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={22} color="#0284c7" />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafe",
  },
  header: {
    backgroundColor: "#0ea5e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#0ea5e9",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e293b",
  },
  profileEmail: {
    fontSize: 15,
    color: "#64748b",
    marginTop: 4,
  },
  menu: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  menuLabel: {
    fontSize: 16,
    color: "#1e293b",
    marginLeft: 12,
    fontWeight: "500",
  },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#ef4444",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
  },
});

export default Profile;
