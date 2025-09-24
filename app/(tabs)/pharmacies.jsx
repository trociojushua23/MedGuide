import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";

const PharmaciesLocator = () => {
  const [location, setLocation] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocationAndFetch();
  }, []);

  const getLocationAndFetch = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      fetchPharmacies(loc.coords.latitude, loc.coords.longitude);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchPharmacies = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node(around:3000,${lat},${lon})["amenity"="pharmacy"];out;`
      );
      const data = await response.json();

      const withDistance = data.elements.map((item) => ({
        ...item,
        distance: getDistance(lat, lon, item.lat, item.lon),
      }));

      withDistance.sort((a, b) => a.distance - b.distance);
      setPharmacies(withDistance);
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Finding nearby pharmacies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Nearby Pharmacies" }} />

      {/* Top row with Back + Reload */}
      <View style={styles.topRow}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
            <Text style={styles.backText}>Back to Home</Text>
          </TouchableOpacity>
        </Link>

        <Pressable onPress={getLocationAndFetch} style={styles.refreshBtn}>
          <Ionicons name="refresh" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Title below buttons */}
      <View style={styles.headerContainer}>
        <Ionicons name="medkit" size={26} color="#0ea5e9" />
        <Text style={styles.header}>Nearby Pharmacies</Text>
      </View>

      {pharmacies.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="sad-outline" size={40} color="#64748b" />
          <Text style={styles.noData}>No pharmacies found nearby.</Text>
        </View>
      ) : (
        <FlatList
          data={pharmacies}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="medkit-outline" size={22} color="#0ea5e9" />
                <Text style={styles.name}>
                  {item.tags?.name || "Unnamed Pharmacy"}
                </Text>
              </View>
              <Text style={styles.address}>
                {item.distance.toFixed(2)} km away
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 20 },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 40, // ⬅️ pushes buttons downward
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0ea5e9",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },

  refreshBtn: {
    backgroundColor: "#0ea5e9",
    padding: 10,
    borderRadius: 10,
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10, // ⬅️ adds spacing below the buttons
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0ea5e9",
    marginLeft: 8,
    flex: 1,
  },

  noData: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#64748b",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginLeft: 6,
  },
  address: { fontSize: 14, color: "#64748b", lineHeight: 20 },

  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#475569" },
});

export default PharmaciesLocator;
