import React from "react";
import styled from "styled-components";
import { BiMoon, BiSun } from "react-icons/bi";

const Button = styled.button`
  all: unset;
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text};
  &:hover {
    cursor: pointer;
  }
`;

const ThemeSwicher = ({ theme, themeToggler }) => {
  return (
    <Button onClick={themeToggler}>
      {theme === "light" ? (
        <BiMoon style={{ marginRight: "5px" }} />
      ) : (
        <BiSun style={{ marginRight: "5px" }} />
      )}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ThemeSwicher;
