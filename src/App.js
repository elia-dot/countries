import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./components/Home";
import Country from "./components/Country";
import TopBar from "./components/TopBar";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Theme";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const { theme, themeToggler } = useDarkMode();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <TopBar theme={theme} themeToggler={themeToggler} />
        <Switch>
          <Route exact path="/" theme={theme} component={Home} />
          <Route exact path="/:country" theme={theme} component={Country} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
