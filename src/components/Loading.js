import React from "react";
import styled from "styled-components";

const LoaderWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100vh;
`;

const Loader = styled.div`
  width: 100px;
  height: 100px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Loading = ({ theme }) => {
  return (
    <LoaderWraper>
      <Loader>Loading Data...</Loader>
    </LoaderWraper>
  );
};

export default Loading;
