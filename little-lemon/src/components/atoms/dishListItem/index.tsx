import React from "react";
import styles from "./styles";
import { Image, Text, View } from "react-native";

interface DishListItemProps {
  name: string;
  price: string;
  description: string;
  image: string;
}

const DishListItem = (props: DishListItemProps) => {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <Text style={styles.price}>${props.price}</Text>
      </View>
      <Image
        style={styles.itemImage}
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${props.image}?raw=true`,
        }}
      />
    </View>
  );
};

export default DishListItem;
