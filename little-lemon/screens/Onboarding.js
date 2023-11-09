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
      <View style={styles.heroSection}>
        <Text style={styles.heroHeader}>Little Lemon</Text>
        <View style={styles.heroBody}>
          <View style={styles.heroSection}>
            <View style={styles.heroBody}>
              <View style={styles.heroContent}>
                <Text style={styles.heroHeader2}>Chicago</Text>
                <Text style={styles.heroText}>
                  We are a family owned Mediterranean restaurant, focused on
                  traditional recipes served with a modern twist.
                </Text>
              </View>
              <Image
                style={styles.heroImage}
                source={require("../assets/HeroImage.png")}
                accessible={true}
                accessibilityLabel={"Little Lemon Food"}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.text}>First Name*</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={firstName}
          onChangeText={setName}
        />
        <Text style={styles.text}>Last Name*</Text>

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.text}>Email*</Text>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  inputContainer: {
    flex: 2,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
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
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  buttonStyle: {
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
  heroSection: {
    flex: 1,
    backgroundColor: "#495e57",
    padding: 15,
  },
  heroHeader: {
    color: "#f4ce14",
    fontSize: 44,
  },
  heroHeader2: {
    color: "#fff",
    fontSize: 20,
  },
  heroText: {
    color: "#fff",
    paddingTop: 10,
    fontSize: 14,
  },
  heroBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  heroContent: {
    flex: 1,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  text: {
    paddingTop: 15,
  },
});

export default Onboarding;
