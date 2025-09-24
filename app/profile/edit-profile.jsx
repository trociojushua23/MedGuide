// File: app/profile/edit-profile.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter, Stack } from "expo-router";
import { db } from "../../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [userId, setUserId] = useState(null);

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserId(parsedUser.id);
          setEmail(parsedUser.email);

          const userRef = doc(db, "users", parsedUser.id);
          const snap = await getDoc(userRef);

          if (snap.exists()) {
            const data = snap.data();
            setName(data.name || "");
            setProfilePic(data.profilePic || null);
          } else {
            setName(parsedUser.name || "");
            setProfilePic(parsedUser.profilePic || null);
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  // Pick new profile picture
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePic(result.assets[0].uri);
    }
  };

  // Save profile
  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      if (userId) {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          name,
          email,
          profilePic: profilePic || null,
        });

        // ✅ Update AsyncStorage currentUser
        const updatedUser = { id: userId, name, email, profilePic };
        await AsyncStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }

      Alert.alert("Success", "Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Edit Profile" }} />

      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={{ color: "#888" }}>Choose Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f9fafe" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#0ea5e9" },
  imageContainer: { alignSelf: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  placeholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 10, padding: 12, marginBottom: 15, fontSize: 16 },
  saveBtn: { backgroundColor: "#0ea5e9", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
