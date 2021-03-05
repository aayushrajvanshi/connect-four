import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider } from "./theme";

import GlobalStyle from "../components/GlobalStyles";

import Home from "../screens/Home";
import StartGame from "../screens/StartGame";
import ComingSoon from "../screens/ComingSoon";
import Tournament from "../screens/Tournament";

const App = () => {
  React.useEffect(() => {
    const setViewport = () => {
      const vh = window.innerHeight * 0.01;
      const vw = window.innerWidth * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);
    };
    setViewport();
    window.addEventListener("resize", () => {
      setViewport();
    });
    return () => {
      window.removeEventListener("resize", () => {
        setViewport();
      });
    };
  });
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/start-game" component={StartGame} />
          <Route path="/coming-soon" component={ComingSoon} />
          <Route path="/tournament" component={Tournament} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
