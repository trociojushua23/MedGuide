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

    // ✅ Use fixed location for Toledo City
    const lat = 10.3775;
    const lon = 123.6503;
    setLocation({ latitude: lat, longitude: lon });
    fetchHospitals(lat, lon);
  };

  const fetchHospitals = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${lat},${lon})["amenity"="hospital"];out;`
      );
      const data = await response.json();

      const withDistance = data.elements.map((item) => ({
        ...item,
        distance: getDistance(lat, lon, item.lat, item.lon),
      }));

      withDistance.sort((a, b) => a.distance - b.distance);

      // ✅ Always add Toledo City General Hospital
      const toledoHospital = {
        id: "toledo-general",
        tags: { name: "Toledo City General Hospital" },
        distance: 0, // center reference
        details: {
          reviews: "2.916 Google reviews",
          type: "Government hospital in Toledo, Cebu",
          location: "Foster Magsaysay Hills, Poblacion Toledo City",
          address: "9JCQ+WFH, Toledo, Cebu",
          phone: "(032) 322 6447",
        },
      };

      setHospitals([toledoHospital, ...withDistance]);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Haversine formula
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Finding hospitals </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Hospitals in Toledo" }} />

      {/* Back button - now same level as refresh button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/home")}
      >
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>

      {/* Refresh button */}
      <TouchableOpacity style={styles.refreshButton} onPress={getHospitals}>
        <MaterialIcons name="refresh" size={24} color="#0ea5e9" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>🏥 Nearby Hospitals</Text>

      {hospitals.length === 0 ? (
        <Text style={styles.noData}>No hospitals found nearby.</Text>
      ) : (
        <FlatList
          data={hospitals}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <MaterialIcons
                  name="local-hospital"
                  size={24}
                  color="#ef4444"
                />
                <Text style={styles.name}>
                  {item.tags?.name || "Unnamed Hospital"}
                </Text>
              </View>

              {item.id === "toledo-general" ? (
                <>
                  <Text style={styles.address}>{item.details.reviews}</Text>
                  <Text style={styles.address}>{item.details.type}</Text>
                  <Text style={styles.address}>
                    Located in: {item.details.location}
                  </Text>
                  <Text style={styles.address}>
                    Address: {item.details.address}
                  </Text>
                  <Text style={styles.address}>
                    Phone: {item.details.phone}
                  </Text>
                </>
              ) : (
                <Text style={styles.address}>
                  {item.distance.toFixed(2)} km away
                </Text>
              )}
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
    position: "absolute",
    top: 70, // ⬅️ same level as refreshButton
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0ea5e9",
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },

  refreshButton: {
    position: "absolute",
    top: 70, // ⬅️ same level as backButton
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
    marginTop: 120, // push below buttons
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
