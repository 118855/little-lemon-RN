import * as React from "react";
import { useColorScheme } from "react-native";
import { Images } from "../styles/index";

export interface ITheme {
  isDark: boolean;
  images: Images.LemonImage;
}

export const ThemeContext = React.createContext({
  isDark: false,
  images: Images.light,
});

export interface ThemeProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const defaultTheme = {
    isDark,
    images: isDark ? Images.dark : Images.light,
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
