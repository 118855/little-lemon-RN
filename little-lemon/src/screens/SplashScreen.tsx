import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useTheme } from "../../src/contexts/ThemeComtext";

const SplashScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={theme.images.logoImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: "90%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
