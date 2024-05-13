import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //


import Login from "./screens/Login";
import Register from "./screens/Register";
import RouletteScreen from "./screens/RouletteScreen";
import SkorScreen from "./screens/SkorScreen";
import SelfSkorScreen from "./screens/SelfSkorScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const UserTab = ({ route }) => ( // User Sayfaları için Tab Navigator gruplandırması, 3 ana sayfa alt sayfa fonksiyonlarına yönlendiriyor
  <Tab.Navigator initialRouteName='RouletteScreen' screenOptions={{ headerShown: false }}> 
    <Tab.Screen name="SkorScreen" component={SkorScreen} options={{ tabBarLabel: 'Tüm Skorlar',tabBarIcon: ({  color, size }) => (<Icon name="scoreboard-outline" color="#09435a" size={25} /> ) }} />
    <Tab.Screen name="RouletteScreen" component={RouletteScreen} options={{ tabBarLabel: 'Rulet Oyna',tabBarIcon: ({  color, size }) => (<Icon name="slot-machine-outline" color="#09435a" size={25} /> ) }} />
    <Tab.Screen name="SelfSkorScreen" component={SelfSkorScreen} options={{ tabBarLabel: 'Benim Skorlarım',tabBarIcon: ({  color, size }) => (<Icon name="scoreboard" color="#09435a" size={25} /> ) }} />

  </Tab.Navigator>
);


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Register" }}
        />

        <Stack.Screen
          name="Roulette"
          component={UserTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
