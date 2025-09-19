import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  let profileImage;

  try {
    // Try to require the local asset
    profileImage = require("../assets/user.png");
  } catch (e) {
    profileImage = null; // if missing, fallback
  }

  return (
    <View style={styles.container}>
      {/* Gradient-style Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerTop}>
          <Ionicons name="medkit" size={40} color="#fff" />

          {/* User Profile Avatar with Fallback */}
          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.profileWrapper}>
              {profileImage ? (
                <Image source={profileImage} style={styles.profileImage} />
              ) : (
                <Ionicons name="person-circle-outline" size={40} color="#fff" />
              )}
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={styles.header}>MedGuide</Text>
        <Text style={styles.subtitle}>Caring for your health, anytime</Text>
      </View>

      {/* Scrollable Grid Navigation */}
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          <NavCard href="/symptom-checker" label="Symptom Checker" icon="pulse" />
          <NavCard href="/medications" label="Medicine Reminder" icon="medkit" />
          <NavCard href="/hospitals" label="Nearby Hospitals" icon="business" />
          <NavCard href="/pharmacies" label="Pharmacies Locator" icon="medkit-outline" />
        </View>
      </ScrollView>
    </View>
  );
};

// Reusable Nav Card
const NavCard = ({ href, label, icon }) => (
  <Link href={href} asChild>
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <Ionicons name={icon} size={32} color="#0284c7" />
      <Text style={styles.cardText}>{label}</Text>
    </TouchableOpacity>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafe",
  },
  headerWrapper: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 30,
    elevation: 6,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  header: {
    fontSize: 30,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#e0f2fe",
    marginTop: 4,
    textAlign: "center",
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    width: "47%",
    height: 140,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    color: "#1e293b",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    textAlign: "center",
  },
});

export default Home;
