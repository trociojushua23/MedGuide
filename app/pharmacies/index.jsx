import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

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
      // Ask location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        setLoading(false);
        return;
      }

      // Get current coordinates
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Fetch nearby pharmacies
      fetchPharmacies(loc.coords.latitude, loc.coords.longitude);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchPharmacies = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=pharmacy&limit=10&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setPharmacies(data);
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
        <Text style={styles.loadingText}>Finding nearby pharmacies...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Ionicons name="medkit" size={26} color="#0ea5e9" />
        <Text style={styles.header}>Nearby Pharmacies</Text>
        <Pressable onPress={getLocationAndFetch} style={styles.refreshBtn}>
          <Ionicons name="refresh" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Results */}
      {pharmacies.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="sad-outline" size={40} color="#64748b" />
          <Text style={styles.noData}>No pharmacies found nearby.</Text>
        </View>
      ) : (
        <FlatList
          data={pharmacies}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Ionicons name="medkit-outline" size={22} color="#0ea5e9" />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0ea5e9",
    marginLeft: 8,
    flex: 1,
  },
  refreshBtn: {
    backgroundColor: "#0ea5e9",
    padding: 8,
    borderRadius: 10,
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginLeft: 6,
  },
  address: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 20,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#475569",
  },
});

export default PharmaciesLocator;
