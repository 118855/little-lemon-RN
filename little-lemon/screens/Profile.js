import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { validateEmail } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [discard, setDiscard] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const getProfile = await AsyncStorage.getItem("profile");
        setProfile(JSON.parse(getProfile));
        setDiscard(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [discard]);

  const validateName = (name) => {
    if (name.length > 0) {
      return name.match(/[^a-zA-Z]/);
    } else {
      return true;
    }
  };

  const validateNumber = (number) => {
    if (isNaN(number)) {
      return false;
    } else if (number.length == 10) {
      return true;
    }
  };

  const { update } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const updateProfile = (key, value) => {
    setProfile((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const getIsFormValid = () => {
    return (
      !validateName(profile.firstName) &&
      !validateName(profile.lastName) &&
      validateEmail(profile.email) &&
      validateNumber(profile.phoneNumber)
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.viewScroll}>
        <Text style={styles.headertext}>Personal information</Text>
        <Text style={styles.text}>Avatar</Text>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/Profile.png")}
            style={styles.avatarImage}
          />
          <View style={styles.avatarButtons}>
            <TouchableOpacity
              style={styles.changeBtn}
              title="Pick an image from camera roll"
              onPress={() => console.log("remove")}
            >
              <Text style={styles.saveBtnText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeBtn}
              title="Pick an image from camera roll"
              onPress={() => console.log("remove")}
            >
              <Text style={styles.discardBtnText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.firstName}
          onChangeText={(newValue) => updateProfile("firstName", newValue)}
          placeholder={"First Name"}
        />
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.lastName}
          onChangeText={(newValue) => updateProfile("lastName", newValue)}
          placeholder={"Last Name"}
        />
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.email}
          keyboardType="email-address"
          onChangeText={(newValue) => updateProfile("email", newValue)}
          placeholder={"Email"}
        />
        <Text style={styles.text}>Phone number</Text>
        <TextInput
          style={styles.inputBox}
          value={profile.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={(newValue) => updateProfile("phoneNumber", newValue)}
          placeholder={"Phone number"}
        />

        <Pressable style={styles.btn} onPress={() => logout()}>
          <Text style={styles.btntext}>Log out</Text>
        </Pressable>
        <View style={styles.buttons}>
          <Pressable style={styles.discardBtn} onPress={() => setDiscard(true)}>
            <Text style={styles.discardBtnText}>Discard changes</Text>
          </Pressable>
          <Pressable
            style={[styles.saveBtn, getIsFormValid() ? "" : styles.btnDisabled]}
            onPress={() => update(profile)}
            disabled={!getIsFormValid()}
          >
            <Text style={styles.saveBtnText}>Save changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  viewScroll: {
    flex: 1,
    padding: 10,
  },
  headertext: {
    fontSize: 22,
    paddingBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputBox: {
    alignSelf: "stretch",
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 9,
    borderColor: "#dfdfe5",
  },
  btn: {
    backgroundColor: "#F4CE14",
    borderRadius: 9,
    alignSelf: "stretch",
    marginVertical: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#cc9a22",
  },
  btnDisabled: {
    backgroundColor: "#98b3aa",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 60,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#495e57",
    borderRadius: 9,
    alignSelf: "stretch",
    padding: 10,
    borderWidth: 1,
    borderColor: "#3f554d",
  },
  saveBtnText: {
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  discardBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    alignSelf: "stretch",
    marginRight: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#83918c",
  },
  discardBtnText: {
    fontSize: 18,
    color: "#3e524b",
    alignSelf: "center",
  },
  btntext: {
    fontSize: 22,
    color: "#3e524b",
    alignSelf: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  error: {
    color: "#d14747",
    fontWeight: "bold",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarEmpty: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0b9a6a",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmptyText: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  avatarButtons: {
    flexDirection: "row",
  },
  changeBtn: {
    backgroundColor: "#495e57",
    borderRadius: 9,
    marginHorizontal: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#3f554d",
  },
  removeBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 9,
    padding: 10,
    borderWidth: 1,
    borderColor: "#83918c",
  },
});

export default Profile;
