import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ThemeSwicher from "./ThemeSwicher";

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.3);
  padding: 0.8em 2em;
`;
const Logo = styled(Link)`
  font-size: 1.5em;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

const TopBar = ({ theme, themeToggler }) => {
  return (
    <Bar>
      <Logo to="/">Countries</Logo>
      <ThemeSwicher theme={theme} themeToggler={themeToggler} />
    </Bar>
  );
};

export default TopBar;
