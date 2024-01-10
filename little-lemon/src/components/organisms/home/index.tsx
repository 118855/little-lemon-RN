import {
  Text,
  View,
  SectionList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import CategoryList from "../../molecules/categoryList/CategoryList";
import DishListItem from "../../../components/atoms/dishListItem";
import { Searchbar } from "react-native-paper";
import { useTheme } from "../../../contexts/ThemeComtext";
import { useNavigation } from "@react-navigation/native";

interface HomeProps {
  data: any;
  sections: any;
  searchBarText: string;
  isDataLoaded: boolean;
  filterSelections: boolean[];
  handleSearchChange(text: string): void;
  handleFiltersChange(index: number): void;
}

const Home = (props: HomeProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={theme.images.logoImage}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
        <Pressable
          style={styles.avatar}
          onPress={() => navigation.navigate("Profile" as never)}
        >
          <Image
            source={theme.images.profileImage}
            style={styles.avatarImage}
          />
        </Pressable>
      </View>
      <View style={styles.heroSection}>
        <Text style={styles.heroHeader}>Little Lemon</Text>
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
            source={theme.images.heroImage}
            accessible={true}
            accessibilityLabel={"Little Lemon Food"}
          />
        </View>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="#333333"
          onChangeText={props.handleSearchChange}
          value={props.searchBarText}
          style={styles.searchBar}
          iconColor="#333333"
          inputStyle={{ color: "#333333" }}
          elevation={0}
        />
      </View>
      <Text style={styles.delivery}>ORDER FOR DELIVERY!</Text>
      <CategoryList
        selections={props.filterSelections}
        onChange={props.handleFiltersChange}
        sections={props.sections}
      />
      {!props.isDataLoaded ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <SectionList
          style={styles.sectionList}
          sections={props.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DishListItem
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          )}
        />
      )}
    </View>
  );
};

export default Home;
