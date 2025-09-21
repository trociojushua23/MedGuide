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

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  // Load existing profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem("profile_name");
        const storedEmail = await AsyncStorage.getItem("profile_email");
        const storedPic = await AsyncStorage.getItem("profile_photo");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedPic) setProfilePic(storedPic);
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

  // Save updated profile
  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    try {
      await AsyncStorage.setItem("profile_name", name);
      await AsyncStorage.setItem("profile_email", email);
      if (profilePic) {
        await AsyncStorage.setItem("profile_photo", profilePic);
      }

      Alert.alert("Success", "Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Custom header title */}
      <Stack.Screen options={{ title: "Edit Profile" }} />

      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Picture Preview */}
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
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#0ea5e9",
  },
  imageContainer: { alignSelf: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
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
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
