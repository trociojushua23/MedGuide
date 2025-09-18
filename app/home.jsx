import { Link } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Hospital Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>🏥 MedGuide</Text>
        <Text style={styles.subtitle}>Caring for your health, anytime</Text>
      </View>

      {/* Scrollable Navigation */}
      <ScrollView 
        contentContainerStyle={styles.cardContainer} 
        showsVerticalScrollIndicator={false}
      >
        <NavCard href="/symptom-checker" label="Symptom Checker" icon="🩺" />
        <NavCard href="/medications" label="Medicine Reminder" icon="💊" />
        <NavCard href="/hospitals" label="Nearby Hospitals" icon="🏥" />
        <NavCard href="/pharmacies" label="Pharmacies Locator" icon="🧾" />
      </ScrollView>
    </View>
  )
}

// Reusable Nav Card
const NavCard = ({ href, label, icon }) => (
  <Link href={href} asChild>
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.cardContent}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.cardText}>{label}</Text>
      </View>
    </TouchableOpacity>
  </Link>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff', // hospital clean background
    paddingHorizontal: 20,
    paddingTop: 0,
  },
  headerWrapper: {
    backgroundColor: '#0ea5e9', // medical blue
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 5,
  },
  header: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e0f2fe',
    textAlign: 'center',
    marginTop: 6,
  },
  cardContainer: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    color: '#1e293b',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  icon: {
    fontSize: 26,
  },
})

export default Home
