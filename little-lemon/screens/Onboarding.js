import React, { useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  Pressable,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";

import { validateEmail, validateName } from "../utils";

const Onboarding = () => {
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const { onboard } = useContext(AuthContext);

  const isEmailValid = validateEmail(email);
  const isFirstNameValid = validateName(firstName);
  const isLastNameValid = validateName(lastName);

  const handleNextPress = async () => {
    if (isFirstNameValid && isLastNameValid && isEmailValid) {
      onboard({ firstName, lastName, email });
    } else {
      Alert.alert("Error", "Please make sure all fields are valid.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/Logo.png")} resizeMode="contain" />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={firstName}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Pressable
        style={({ pressed }) => [
          styles.buttonStyle,
          !isFirstNameValid || !isLastNameValid || !isEmailValid
            ? styles.buttonDisabled
            : {},
          pressed && styles.buttonPressed, // Добавьте этот стиль, если нужно изменить стиль при нажатии
        ]}
        onPress={handleNextPress}
        disabled={!isFirstNameValid || !isLastNameValid || !isEmailValid}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },
  header: {
    width: "100%",
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    height: 60,
    width: 200,
    resizeMode: "contain",
  },
  input: {
    height: 40,
    width: "80%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  buttonStyle: {
    width: 300,
    padding: 10,
    borderRadius: 9,
    margin: 10,
    backgroundColor: "#F4CE14",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
  },
  buttonDisabled: {
    borderRadius: 9,
    backgroundColor: "#495e57",
  },
  buttonPressed: {
    borderRadius: 9,
    backgroundColor: "3f554d",
  },
});

export default Onboarding;
