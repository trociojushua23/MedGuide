import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";

export default function Hospitals() {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      setLoading(false);
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
    fetchHospitals(loc.coords.latitude, loc.coords.longitude);
  };

  const fetchHospitals = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=hospital&limit=15&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setHospitals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Finding nearby hospitals...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom header title */}
      <Stack.Screen options={{ title: "Nearby Hospitals" }} />

      {/* 🔙 Back to Home */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/home")}
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>

      {/* 🔄 Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={getHospitals}>
        <MaterialIcons name="refresh" size={24} color="#0ea5e9" />
      </TouchableOpacity>

      <Text style={styles.header}>🏥 Nearby Hospitals</Text>
      {hospitals.length === 0 ? (
        <Text style={styles.noData}>No hospitals found nearby.</Text>
      ) : (
        <FlatList
          data={hospitals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons
                  name="local-hospital"
                  size={24}
                  color="#ef4444"
                />
                <Text style={styles.name}>
                  {item.display_name.split(",")[0]}
                </Text>
              </View>
              <Text style={styles.address}>{item.display_name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 20 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0ea5e9",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  refreshButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
    elevation: 3,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0ea5e9",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 8,
  },
  address: { fontSize: 14, color: "#6b7280", lineHeight: 20 },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    marginTop: 20,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#374151" },
});
