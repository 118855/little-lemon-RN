import { useEffect, useState, useCallback, useMemo } from "react";
import { Alert } from "react-native";
import debounce from "lodash.debounce";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from "../../database";
import { getSectionListData, useUpdateEffect } from "../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../components/organisms/home";
import { useNavigation } from "@react-navigation/native";

const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const sections = ["starters", "mains", "desserts"];

  const [data, setData] = useState([Object]);
  const [searchBarText, setSearchBarText] = useState("");
  const [query, setQuery] = useState("");
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const menu = json.menu.map((item: any, index: number) => ({
        id: index + 1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category,
      }));
      return menu;
    } catch (error) {
      console.error(error);
    } finally {
      setIsDataLoaded(true);
    }
  };

  useEffect(() => {
    (async () => {
      let menuItems = [];
      try {
        await createTable();
        menuItems = await getMenuItems();

        if (!menuItems.length) {
          menuItems = await fetchData();
          saveMenuItems(menuItems);
        }
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        const getProfile = await AsyncStorage.getItem("profile");
        setProfile(JSON.parse(getProfile!));
        setIsDataLoaded(true);
      } catch (e: any) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, index) => {
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[index];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (error: any) {
        Alert.alert(error.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q: any) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text: string) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index: number) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <Home
      data={data}
      sections={sections}
      handleSearchChange={(text) => {
        handleSearchChange(text);
      }}
      searchBarText={searchBarText}
      filterSelections={filterSelections}
      handleFiltersChange={handleFiltersChange}
      isDataLoaded={isDataLoaded}
    />
  );
};

export default HomeScreen;
