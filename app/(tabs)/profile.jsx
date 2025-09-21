import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Stack } from "expo-router";

const Profile = () => {
  const [name, setName] = useState("Guest User");
  const [email, setEmail] = useState("guest@email.com");
  const [photo, setPhoto] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem("profile_name");
        const storedEmail = await AsyncStorage.getItem("profile_email");
        const storedPhoto = await AsyncStorage.getItem("profile_photo");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedPhoto) setPhoto(storedPhoto);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
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

      {/* Back to Home */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.menuText}>🏠 Back to Home</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Text style={styles.logoutText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// para dili na mugawas ang "(tabs)/profile" sa ibabaw
Profile.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafe", alignItems: "center" },
  header: {
    width: "100%",
    padding: 20,
    backgroundColor: "#0ea5e9",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: "#0ea5e9",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    backgroundColor: "#eee",
  },
  name: { fontSize: 22, fontWeight: "700", color: "#222" },
  email: { fontSize: 16, color: "#555", marginBottom: 30 },
  menuItem: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  menuText: { fontSize: 16, color: "#2e2c2cff" },
  logoutBtn: {
    marginTop: 30,
    width: "90%",
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

export default Profile;
