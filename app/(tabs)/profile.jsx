// File: app/(tabs)/profile.jsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const [name, setName] = useState("Guest User");
  const [email, setEmail] = useState("guest@email.com");
  const [photo, setPhoto] = useState(null);
  const router = useRouter();

  const loadProfile = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("currentUser");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user) {
        if (user.name) setName(user.name);
        if (user.email) setEmail(user.email);
        if (user.profilePic) setPhoto(user.profilePic);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            router.replace("/"); 
          } catch (error) {
            console.error("Logout error:", error);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
        <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Photo */}
      {photo ? (
        <Image source={{ uri: photo }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.placeholder]}>
          <Text style={{ color: "#888" }}>No Photo</Text>
        </View>
      )}

      {/* Name & Email */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      {/* Menu Options */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/profile/edit-profile")}
      >
        <Text style={styles.menuText}>✏️ Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/change-password")}
      >
        <Text style={styles.menuText}>🔒 Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/notifications")}
      >
        <Text style={styles.menuText}>🔔 Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/help-support")}
      >
        <Text style={styles.menuText}>❓ Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.menuText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafe", alignItems: "center" },

  header: {
    width: "100%",
    paddingVertical: 35, // ⬅️ more downward padding
    backgroundColor: "#0ea5e9",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  logoutIcon: {
    position: "absolute",
    right: 20,
    alignSelf: "center" // ⬅️ aligns better vertically
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 25,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#0ea5e9",
  },
  placeholder: { backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },

  name: { fontSize: 22, fontWeight: "700", color: "#222" },
  email: { fontSize: 16, color: "#555", marginBottom: 30 },

  menuItem: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  menuText: { fontSize: 16, color: "#2e2c2cff" },
});

export default Profile;
