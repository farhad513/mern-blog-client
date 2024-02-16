import React from "react";
import { useSelector } from "react-redux";
const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  //   console.log(children);
  return (
    <div className={theme}>
      <div className={`${theme === "light" ? "dark_color" : "white_color"}`}>
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
