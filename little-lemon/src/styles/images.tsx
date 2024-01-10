import { ImageSourcePropType } from "react-native";

export interface LemonImage {
  logoImage: ImageSourcePropType;
  profileImage: ImageSourcePropType;
  heroImage: ImageSourcePropType;
}
export const light = {
  logoImage: require("../../assets/Logo.png"),
  profileImage: require("../../assets/Profile.png"),
  heroImage: require("../../assets/HeroImage.png"),
};
export const dark = {
  logoImage: require("../../assets/Logo.png"),
  profileImage: require("../../assets/Profile.png"),
  heroImage: require("../../assets/HeroImage.png"),
};
