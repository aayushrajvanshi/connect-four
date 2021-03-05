import React from "react";

const defaultTheme = {
  palette: {
    default: {
      main: "#84A4FC",
    },
    primary: {
      main: "#37AC5D",
      light: "#DCF6E4",
      dark: "#278D48",
    },
    secondary: {
      main: "#F8D146",
      light: "#F6EFD5",
      dark: "#BB9A22",
    },
    tertiary: {
      main: "#B1C4F9",
      light: "#EFF3FF",
    },
  },
};

const ThemeContext = React.createContext(defaultTheme);
const ThemeProvider = (props: any) => (
  <ThemeContext.Provider value={defaultTheme} {...props} />
);
const useTheme = () => {
  const theme = React.useContext(ThemeContext);
  if (!theme) {
    throw new Error("Cannot use `useTheme` outside of a ThemeProvider");
  }
  return theme;
};

export { ThemeProvider, useTheme };
