import { StyleSheet } from "react-native";

export default StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    color: "#000000",
    paddingBottom: 5,
  },
  description: {
    color: "#495e57",
    paddingRight: 5,
    width: 250,
  },
  price: {
    fontSize: 18,
    color: "#495e57",
    paddingTop: 7,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});
