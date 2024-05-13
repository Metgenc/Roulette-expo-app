import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

//YOUR API KEY
const firebaseConfig = {
  apiKey: 
  authDomain: 
  projectId: 
  storageBucket: 
  messagingSenderId: 
  appId: 
  measurementId: 
};

initializeApp(firebaseConfig);
const auth = getAuth();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      console.log(email);
      navigation.navigate("Roulette", {
        screen: "RouletteScreen",
        params: { email },
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error logging in:", errorCode, errorMessage);
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gifImage}>
        <LottieView
          source={require("../components/Images/rouletteAnimation.json")}
          autoPlay
          loop
        />
      </View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkText}>
          Don't you have an account? Register!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  gifImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#ffe203",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  linkText: {
    color: "#ffe203",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
