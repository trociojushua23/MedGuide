// File: App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import your screens
import FirstAidGuide from "./screens/FirstAidGuide";
import PharmaciesLocator from "./screens/PharmaciesLocator";
import Login from "./screens/Login"; // sample only

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" // first screen on app start
        screenOptions={{
          headerStyle: { backgroundColor: "#0ea5e9" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Nearby Pharmacies" component={PharmaciesLocator} />
        <Stack.Screen name="First Aid Guide" component={FirstAidGuide} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
